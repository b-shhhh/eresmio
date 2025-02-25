// src/components/AddPost.js
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "../css/addpost.css";

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFiles, setImageFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        const mappedFiles = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImageFiles(mappedFiles);
    }, []);

    useEffect(() => {
        return () => {
            imageFiles.forEach((fileObj) => URL.revokeObjectURL(fileObj.preview));
        };
    }, [imageFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (imageFiles.length > 0) {
            formData.append("image", imageFiles[0].file);
        }

        try {
            await axios.post('http://localhost:3000/api/pins', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTitle("");
            setDescription("");
            setImageFiles([]);
        } catch (error) {
            console.error("Error creating pin:", error.response?.data.error);
        }
    };

    return (
        <div className="post-container">
            <h2>Create a New Post</h2>
            <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
                <input {...getInputProps()} />
                {imageFiles.length === 0 ? (
                    <p className="placeholder-text">Drag & drop an image here, or click to select</p>
                ) : (
                    <div className="image-preview-container">
                        {imageFiles.map((fileObj, idx) => (
                            <img key={idx} src={fileObj.preview} alt={`Preview ${idx}`} className="image-preview" />
                        ))}
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="post-form">
                <label htmlFor="post-title">Title</label>
                <input id="post-title" type="text" placeholder="Enter a title..." value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label htmlFor="post-description">Description</label>
                <input id="post-description" type="text" placeholder="Enter description..." value={description} onChange={(e) => setDescription(e.target.value)} required />
                <button type="submit" className="submit-btn">Save</button>
            </form>
        </div>
    );
};

export default AddPost;