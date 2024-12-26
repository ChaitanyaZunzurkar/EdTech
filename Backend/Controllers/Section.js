const Course = require('../Models/Course')
const Section = require('../Models/Section')

exports.createSection = async (req ,res) => {
    try {
        const { sectionName , courseId } = req.body

        if(!sectionName || !courseId) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields."
            })
        }

        const section = await Section.create({ sectionName })

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push : {
                    courseContent: section._id
                }
            },
            { new:true }
        ).populate("courseContent")

        console.log("updated Course" , updatedCourse)
        res.status(200).json({
            success:true,
            message:"Section created successfully.",
            section
        })

    } catch(error) {
        console.log("Fail to create a section" , error.message)
        return res.status(500).json({
            success:false,
            message:"Fail to create a section."
        })
    }
}

exports.updatedSection = async (req ,res) => {
    try {
        const { sectionName , sectionId } = req.body;
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields."
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName : sectionName},
            { new : true }
        )

        res.status(200).json({
            success:true,
            message:"Section updated successfully.",
            section : updatedSection
        })        
    } catch(error) {
        console.log("Fail to update a section" , error.message)
        return res.status(500).json({
            success:false,
            message:"Fail to update a section."
        })
    }
}

exports.deleteSection = async (req , res) => {
    try {
        const { sectionId } = req.params
        if(!sectionId) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields."
            })
        }

        const deletedSection = await Section.findByIdAndDelete(sectionId)

        res.status(200).json({
            success:true,
            message:"Section updated successfully.",
        }) 

    } catch(error) {
        console.log("Fail to delete a section" , error.message)
        return res.status(500).json({
            success:false,
            message:"Fail to delete a section."
        })
    }
}