const router = require('express').Router();
const mongoose = require('mongoose');
const BlogPost = require('../models/blogPost');

router.post('/blog', async (req, res) => {
    const { title, content, author } = req.body;
  
    try {
      const newPost = new BlogPost({ title, content, author, publicationDate: new Date() });
      await newPost.save();
      res.status(201).json({ message: 'Blog post created successfully', postId: newPost._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get all blog posts
  router.get('/blog', async (req, res) => {
    try {
      const posts = await BlogPost.find();
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get a single blog post
  router.get('/blog/:id', async (req, res) => {
    const postId = req.params.id;
  
    try {
      const post = await BlogPost.findById(postId);
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Update a blog post
  router.put('/blog/:id', async (req, res) => {
    const postId = req.params.id;
    const { title, content, author } = req.body;
  
    try {
      const post = await BlogPost.findByIdAndUpdate(
        postId,
        { title, content, author },
        { new: true }
      );
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }
      res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Delete a blog post
  router.delete('/blog/:id', async (req, res) => {
    const postId = req.params.id;
  
    try {
      const post = await BlogPost.findByIdAndDelete(postId);
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router