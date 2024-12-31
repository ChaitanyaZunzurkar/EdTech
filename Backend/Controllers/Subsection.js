const Section = require('../Models/Section')
const SubSection = require('../Models/SubSection')
const { imageUploader } = require("../Utils/imageUpload")
require('dotenv').config()

exports.createSubSection = async (req , res) => {
    try {
        const { SectionId , title , timeDuration , description } = req.body

        const video = req.files.videoUrl
        
        if(!SectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields"
            })
        }
        const videoUrl = await imageUploader(video , process.env.FOLDER_NAME)

        const subSection = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl:videoUrl.secure_url
        })

        const updateSection = await Section.findByIdAndUpdate(
            SectionId,
            {
                $push : {
                    subSection: subSection
                }
            },
            { new: true }
        ).populate("subSection")

        res.status(200).json({
            success:true,
            message:"Sub-section created successfully.",
            updateSection
        })

    } catch(error) {
        console.log("Error while creating sub-section" , error.message)
        return res.status(500).json({
            success:false,
            message:"Fail to createing sub-section"
        })
    }
}

exports.updateSubSection = async (req, res) => {
    try {
        const { title , description , timeDuration , SectionId } = req.body
        const video = req.files.videoUrl

        if(!description || !title || !timeDuration || !SectionId || !video) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields"
            })
        }

        const videoUrl = await imageUploader(video , process.env.FOLDER_NAME)

        const updatedSubSection = SubSection.findByIdAndUpdate(
            SectionId,
            {
                title,
                description,
                timeDuration,
                videoUrl: videoUrl.secure_url
            }
        )

        res.status(200).json({
            success:true,
            message:"Sub-section updated successfully."
        })

    } catch(error) {
        console.log("Error while updating sub-section" , error.message)
        return res.status(500).json({
            success:false,
            message:"Fail to updating sub-section"
        })
    }
}

exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId } = req.body
        if(!subSectionId) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields"
            })
        }

        const deleteSubSection = await SubSection.findByIdAndDelete(subSectionId)

        res.status(200).json({
            success:true,
            message:"Sub section deleted successfullt"
        })

    } catch(error) {
        console.log("Error while deleteing sub-section" , error.message)
        return res.status(500).json({
            success:false,
            message:"Fail to deleteing sub-section"
        })
    }
}