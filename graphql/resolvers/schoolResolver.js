// graphql/resolvers/schoolResolver.js
import School from '../../models/School.js';

const schoolResolver = {
    Query: {
        getSchool: async (_, { id }) => {
            const school = await School.findById(id).populate('teachers');
            if (!school) {
                throw new Error('School not found');
            }
            return school;
        },
        getAllSchools: async () => {
            return await School.find().populate('teachers');
        },
    },

    Mutation: {
        createSchool: async (_, { input }) => {
            const newSchool = new School(input);
            await newSchool.save();
            return newSchool;
        },
        updateSchool: async (_, { id, input }) => {
            const updatedSchool = await School.findByIdAndUpdate(id, input, { new: true });
            if (!updatedSchool) {
                throw new Error('School not found');
            }
            return updatedSchool;
        },
        deleteSchool: async (_, { id }) => {
            const result = await School.findByIdAndDelete(id);
            return result !== null;
        },
    },
};

export default schoolResolver;
