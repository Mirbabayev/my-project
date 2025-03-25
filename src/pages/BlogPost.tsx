import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { BlogPost as BlogPostType } from '../types';
import { blogPosts } from '../data/blog-posts';
import Markdown from 'react-markdown';

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    // Slug-a görə postu tapın
    const foundPost = blogPosts.find(p => p.slug === slug);
    
    if (foundPost) {
      setPost(foundPost);
      
      // Eyni teqləri paylaşan əlaqəli postları tapın
      if (foundPost.tags && foundPost.tags.length > 0) {
        const related = blogPosts
          .filter(p => p.id !== foundPost.id && p.tags?.some(tag => foundPost.tags?.includes(tag)))
          .slice(0, 3);
        setRelatedPosts(related);
      }
    } else {
      // Post tapılmadı, istifadəçini bloq siyahısına yönləndirin
      navigate('/blog');
    }
  }, [slug, navigate]);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="inline-block p-8 bg-white rounded-lg shadow-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Yüklənir...</p>
        </div>
      </div>
    );
  }

  // Tarixi formatlaşdırma funksiyası
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('az-AZ', options);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Üst panel */}
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Bloqa qayıt
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-500 text-sm gap-4 mb-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formatDate(post.publishDate)}</span>
            </div>
            
            {post.author && (
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{post.author}</span>
              </div>
            )}
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/blog?tag=${tag}`}
                  className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
        
        {/* Şəkil */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Məqalə məzmunu */}
        <div className="prose prose-lg max-w-none">
          <Markdown>{post.content}</Markdown>
        </div>
        
        {/* Əlaqəli məqalələr */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Əlaqəli məqalələr</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.slug}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={relatedPost.imageUrl} 
                      alt={relatedPost.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-2">{relatedPost.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 