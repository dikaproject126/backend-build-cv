import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String, default: "Untitle Resume"
    },
    public: {
        type: Boolean, default: false
    },
    template: {
        type: String, default: 'classic'
    },
    accentColor: {
        type: String, default: 'darkblue'
    },
    summery: {
        type: String, default: ''
    },
    skills: [{
        type: String
    }],
    personalInfo: {
        image: {
            type: String, default: ''
        },
        fullname: {
            type: String, default: ''
        },
        jobTitle: {
            type: String, default: ''
        },
        email: {
            type: String, default: ''
        },
        phone: {
            type: String, default: ''
        },
        address: {
            type: String, default: ''
        },
        linkendinUrl: {
            type: String, default: ''
        },
        portofolioUrl: {
            type: String, default: ''
        },
    }, 
    experience: [
        {
            company: {type: String},
            position: {type: String},
            startDate: {type: String},
            endDate: {type: String},
            isCurrent: {type: Boolean, default: false},
            description: {type: String}
        }
    ],
    project: [
        {
            name: {type: String},
            type: {type: String},
            description: {type: String}
        }
    ],
    education: [
        {
            institutName: {type: String}, 
            degree: {type: String},
            fieldOfStudy: {type: String},
            startDate: {type: String},
            endDate: {type: String},
            gpa: {type: String}
        }
    ]
}, {
    timestamps: true,
    minimize: false
})

const Resume = mongoose.model('Resume', ResumeSchema);

export default Resume;