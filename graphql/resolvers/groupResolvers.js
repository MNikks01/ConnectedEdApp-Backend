import Group from '../../models/Group.js'; // Adjust the path as necessary

const groupResolvers = {
    Query: {
        getAllGroups: async () => {
            return await Group.find()
                .populate('members', 'name')
                .populate('admin', 'name')
                .populate('createdBy', 'name')
                .populate('chat');
        },
        getGroupById: async (_, { id }) => {
            const group = await Group.findById(id)
                .populate('members', 'name')
                .populate('admin', 'name')
                .populate('createdBy', 'name')
                .populate('chat');

            if (!group) throw new Error('Group not found');
            return group;
        },
    },
    Mutation: {
        createGroup: async (_, { name, description }, { user }) => {
            const newGroup = new Group({
                name,
                description,
                createdBy: user._id,
                admin: [user._id],  // Creator is automatically an admin
                members: [user._id]  // Creator is automatically a member
            });

            return await newGroup.save();
        },
        updateGroup: async (_, { id, name, description }, { user }) => {
            const group = await Group.findById(id);
            if (!group) throw new Error('Group not found');

            // Check if user is an admin
            if (!group.admin.includes(user._id)) {
                throw new Error('Not authorized to update this group');
            }

            const updatedGroup = await Group.findByIdAndUpdate(
                id,
                { name, description },
                { new: true, runValidators: true }
            );

            return updatedGroup;
        },
        deleteGroup: async (_, { id }, { user }) => {
            const group = await Group.findById(id);
            if (!group) throw new Error('Group not found');

            // Check if user is the creator
            if (group.createdBy.toString() !== user._id.toString()) {
                throw new Error('Only group creator can delete the group');
            }

            await Group.findByIdAndDelete(id);
            return 'Group deleted successfully';
        },
        addMember: async (_, { id, userId }, { user }) => {
            const group = await Group.findById(id);
            if (!group) throw new Error('Group not found');

            if (!group.admin.includes(user._id)) {
                throw new Error('Only admins can add members');
            }

            if (group.members.includes(userId)) {
                throw new Error('User is already a member');
            }

            group.members.push(userId);
            await group.save();

            return group;
        },
        removeMember: async (_, { id, userId }, { user }) => {
            const group = await Group.findById(id);
            if (!group) throw new Error('Group not found');

            if (!group.admin.includes(user._id)) {
                throw new Error('Only admins can remove members');
            }

            if (userId === group.createdBy.toString()) {
                throw new Error('Cannot remove group creator');
            }

            group.members = group.members.filter(member => member.toString() !== userId);
            group.admin = group.admin.filter(admin => admin.toString() !== userId);
            await group.save();

            return group;
        },
        addAdmin: async (_, { id, userId }, { user }) => {
            const group = await Group.findById(id);
            if (!group) throw new Error('Group not found');

            if (group.createdBy.toString() !== user._id.toString()) {
                throw new Error('Only group creator can add admins');
            }

            if (!group.members.includes(userId)) {
                throw new Error('User must be a member first');
            }

            if (group.admin.includes(userId)) {
                throw new Error('User is already an admin');
            }

            group.admin.push(userId);
            await group.save();

            return group;
        },
        removeAdmin: async (_, { id, userId }, { user }) => {
            const group = await Group.findById(id);
            if (!group) throw new Error('Group not found');

            if (group.createdBy.toString() !== user._id.toString()) {
                throw new Error('Only group creator can remove admins');
            }

            if (userId === group.createdBy.toString()) {
                throw new Error('Cannot remove creator from admin');
            }

            group.admin = group.admin.filter(admin => admin.toString() !== userId);
            await group.save();

            return group;
        },
        joinGroup: async (_, { id }, { user }) => {
            const group = await Group.findById(id);
            if (!group) throw new Error('Group not found');

            if (group.members.includes(user._id)) {
                throw new Error('Already a member of this group');
            }

            group.members.push(user._id);
            await group.save();

            return group;
        },
        leaveGroup: async (_, { id }, { user }) => {
            const group = await Group.findById(id);
            if (!group) throw new Error('Group not found');

            if (group.createdBy.toString() === user._id.toString()) {
                throw new Error('Group creator cannot leave the group');
            }

            group.members = group.members.filter(member => member.toString() !== user._id.toString());
            group.admin = group.admin.filter(admin => admin.toString() !== user._id.toString());
            await group.save();

            return 'Successfully left the group';
        },
    },
};

export default groupResolvers; 