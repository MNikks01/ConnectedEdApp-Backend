import Syllabus from '../../models/Syllabus.js'; // Adjust the path as necessary

const syllabusResolvers = {
    Query: {
        getAllSyllabuses: async () => {
            return await Syllabus.find()
                .populate('teacher', 'name')
                .populate('subject', 'name')
                .sort({ createdAt: -1 });
        },
        getSyllabusById: async (_, { id }) => {
            const syllabus = await Syllabus.findById(id)
                .populate('teacher', 'name')
                .populate('subject', 'name');

            if (!syllabus) throw new Error('Syllabus not found');
            return syllabus;
        },
    },
    Mutation: {
        createSyllabus: async (_, { school, schoolClass, schoolMedium, schoolSection, clsMedSec, subject, currentChapter, chapterCompleted }, { user }) => {
            const newSyllabus = new Syllabus({
                school,
                schoolClass,
                schoolMedium,
                schoolSection,
                clsMedSec,
                subject,
                currentChapter,
                chapterCompleted,
                teacher: user._id, // Assuming user ID is available from auth middleware
            });

            return await newSyllabus.save();
        },
        updateSyllabus: async (_, { id, schoolClass, schoolMedium, schoolSection, clsMedSec, subject, currentChapter, chapterCompleted }, { user }) => {
            const syllabus = await Syllabus.findById(id);
            if (!syllabus) throw new Error('Syllabus not found');

            // Check if user is the owner (teacher)
            if (syllabus.teacher.toString() !== user._id.toString()) {
                throw new Error('Not authorized to update this syllabus');
            }

            const updatedSyllabus = await Syllabus.findByIdAndUpdate(
                id,
                { schoolClass, schoolMedium, schoolSection, clsMedSec, subject, currentChapter, chapterCompleted },
                { new: true, runValidators: true }
            );

            return updatedSyllabus;
        },
        deleteSyllabus: async (_, { id }, { user }) => {
            const syllabus = await Syllabus.findById(id);
            if (!syllabus) throw new Error('Syllabus not found');

            // Check if user is the owner (teacher)
            if (syllabus.teacher.toString() !== user._id.toString()) {
                throw new Error('Not authorized to delete this syllabus');
            }

            await Syllabus.findByIdAndDelete(id);
            return 'Syllabus deleted successfully';
        },
    },
};

export default syllabusResolvers; 