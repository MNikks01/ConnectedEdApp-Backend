import ProjectAndHomework from '../../models/ProjectAndHomework.js'; // Adjust the path as necessary

const projectAndHomeworkResolvers = {
    Query: {
        getAllProjectsAndHomeworks: async () => {
            return await ProjectAndHomework.find()
                .populate('teacher', 'name')
                .populate('school', 'name')
                .sort({ createdAt: -1 });
        },
        getProjectAndHomeworkById: async (_, { id }) => {
            const projectAndHomework = await ProjectAndHomework.findById(id)
                .populate('teacher', 'name')
                .populate('school', 'name');

            if (!projectAndHomework) throw new Error('Project or homework not found');
            return projectAndHomework;
        },
    },
    Mutation: {
        createProjectAndHomework: async (_, { questionImage, questionStatement, submitBefore, questionNote, type, schoolClass, schoolMedium, schoolSection, clsMedSec, subject }, { user }) => {
            const newProjectAndHomework = new ProjectAndHomework({
                questionImage,
                questionStatement,
                submitBefore,
                questionNote,
                type,
                teacher: user._id, // Assuming user ID is available from auth middleware
                school: user._id, // Assuming the school is the same as the teacher for simplicity
                schoolClass,
                schoolMedium,
                schoolSection,
                clsMedSec,
                subject,
            });

            return await newProjectAndHomework.save();
        },
        updateProjectAndHomework: async (_, { id, questionImage, questionStatement, submitBefore, questionNote, type, schoolClass, schoolMedium, schoolSection, clsMedSec, subject }, { user }) => {
            const projectAndHomework = await ProjectAndHomework.findById(id);
            if (!projectAndHomework) throw new Error('Project or homework not found');

            // Check if user is the owner (teacher)
            if (projectAndHomework.teacher.toString() !== user._id.toString()) {
                throw new Error('Not authorized to update this project or homework');
            }

            const updatedProjectAndHomework = await ProjectAndHomework.findByIdAndUpdate(
                id,
                { questionImage, questionStatement, submitBefore, questionNote, type, schoolClass, schoolMedium, schoolSection, clsMedSec, subject },
                { new: true, runValidators: true }
            );

            return updatedProjectAndHomework;
        },
        deleteProjectAndHomework: async (_, { id }, { user }) => {
            const projectAndHomework = await ProjectAndHomework.findById(id);
            if (!projectAndHomework) throw new Error('Project or homework not found');

            // Check if user is the owner (teacher)
            if (projectAndHomework.teacher.toString() !== user._id.toString()) {
                throw new Error('Not authorized to delete this project or homework');
            }

            await ProjectAndHomework.findByIdAndDelete(id);
            return 'Project or homework deleted successfully';
        },
    },
};

export default projectAndHomeworkResolvers; 