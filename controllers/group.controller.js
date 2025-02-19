import Group from '../models/Group.js';

export {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    addMember,
    removeMember,
    addAdmin,
    removeAdmin,
    joinGroup,
    leaveGroup
};

async function getAllGroups(req, res) {
    try {
        const groups = await Group.find()
            .populate('members', 'name')
            .populate('admin', 'name')
            .populate('createdBy', 'name')
            .populate('chat');
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching groups', error: error.message });
    }
}

async function getGroupById(req, res) {
    try {
        const group = await Group.findById(req.params.id)
            .populate('members', 'name')
            .populate('admin', 'name')
            .populate('createdBy', 'name')
            .populate('chat');

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching group', error: error.message });
    }
}

async function createGroup(req, res) {
    try {
        const newGroup = new Group({
            ...req.body,
            createdBy: req.user._id,
            admin: [req.user._id],  // Creator is automatically an admin
            members: [req.user._id]  // Creator is automatically a member
        });

        const savedGroup = await newGroup.save();
        res.status(201).json(savedGroup);
    } catch (error) {
        res.status(400).json({ message: 'Error creating group', error: error.message });
    }
}

async function updateGroup(req, res) {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if user is an admin
        if (!group.admin.includes(req.user._id)) {
            return res.status(403).json({ message: 'Not authorized to update this group' });
        }

        const updatedGroup = await Group.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(400).json({ message: 'Error updating group', error: error.message });
    }
}

async function deleteGroup(req, res) {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if user is the creator
        if (group.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only group creator can delete the group' });
        }

        await Group.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting group', error: error.message });
    }
}

async function addMember(req, res) {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (!group.admin.includes(req.user._id)) {
            return res.status(403).json({ message: 'Only admins can add members' });
        }

        const { userId } = req.body;
        if (group.members.includes(userId)) {
            return res.status(400).json({ message: 'User is already a member' });
        }

        group.members.push(userId);
        await group.save();

        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: 'Error adding member', error: error.message });
    }
}

async function removeMember(req, res) {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (!group.admin.includes(req.user._id)) {
            return res.status(403).json({ message: 'Only admins can remove members' });
        }

        const { userId } = req.body;
        if (userId === group.createdBy.toString()) {
            return res.status(400).json({ message: 'Cannot remove group creator' });
        }

        group.members = group.members.filter(member => member.toString() !== userId);
        group.admin = group.admin.filter(admin => admin.toString() !== userId);
        await group.save();

        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: 'Error removing member', error: error.message });
    }
}

async function addAdmin(req, res) {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only group creator can add admins' });
        }

        const { userId } = req.body;
        if (!group.members.includes(userId)) {
            return res.status(400).json({ message: 'User must be a member first' });
        }

        if (group.admin.includes(userId)) {
            return res.status(400).json({ message: 'User is already an admin' });
        }

        group.admin.push(userId);
        await group.save();

        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: 'Error adding admin', error: error.message });
    }
}

async function removeAdmin(req, res) {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only group creator can remove admins' });
        }

        const { userId } = req.body;
        if (userId === group.createdBy.toString()) {
            return res.status(400).json({ message: 'Cannot remove creator from admin' });
        }

        group.admin = group.admin.filter(admin => admin.toString() !== userId);
        await group.save();

        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: 'Error removing admin', error: error.message });
    }
}

async function joinGroup(req, res) {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.members.includes(req.user._id)) {
            return res.status(400).json({ message: 'Already a member of this group' });
        }

        group.members.push(req.user._id);
        await group.save();

        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: 'Error joining group', error: error.message });
    }
}

async function leaveGroup(req, res) {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.createdBy.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: 'Group creator cannot leave the group' });
        }

        group.members = group.members.filter(member => member.toString() !== req.user._id.toString());
        group.admin = group.admin.filter(admin => admin.toString() !== req.user._id.toString());
        await group.save();

        res.status(200).json({ message: 'Successfully left the group' });
    } catch (error) {
        res.status(400).json({ message: 'Error leaving group', error: error.message });
    }
} 