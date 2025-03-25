import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Pencil, Trash2, Plus, Search, X, Calendar } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  status: 'draft' | 'published';
  imageUrl: string;
}

const AdminBlog: React.FC = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: 'Ətir hazırlama sənəti',
      slug: 'etir-hazirlama-seneti',
      excerpt: 'Lüks ətirlər yaratmağın incəlikləri haqqında məlumat...',
      content: 'Tam mətn burada...',
      author: 'Əli Məmmədov',
      publishDate: '2024-03-25',
      status: 'published',
      imageUrl: '/images/blog/perfume-making.jpg',
    },
    {
      id: 2,
      title: 'Yay üçün top 10 ətir',
      slug: 'yay-ucun-top-10-etir',
      excerpt: 'Yay mövsümü üçün ən yaxşı ətirlər...',
      content: 'Tam mətn burada...',
      author: 'Aygün Həsənova',
      publishDate: '2024-03-24',
      status: 'draft',
      imageUrl: '/images/blog/summer-fragrances.jpg',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPost = () => {
    setCurrentPost({
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      publishDate: new Date().toISOString().split('T')[0],
      status: 'draft',
      imageUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost({ ...post });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (post: BlogPost) => {
    setPostToDelete(post);
    setIsDeleteModalOpen(true);
  };

  const handleDeletePost = () => {
    if (postToDelete) {
      setPosts(posts.filter(p => p.id !== postToDelete.id));
      setIsDeleteModalOpen(false);
      setPostToDelete(null);
    }
  };

  const handleSavePost = () => {
    if (currentPost) {
      if (!currentPost.title || !currentPost.excerpt || !currentPost.content) {
        alert('Başlıq, qısa məzmun və mətn tələb olunur');
        return;
      }

      const isNewPost = !posts.some(p => p.id === currentPost.id);
      
      if (isNewPost) {
        setPosts([...posts, currentPost as BlogPost]);
      } else {
        setPosts(
          posts.map(p => (p.id === currentPost.id ? currentPost as BlogPost : p))
        );
      }
      
      setIsModalOpen(false);
      setCurrentPost(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentPost(prev => prev ? { ...prev, [name]: value } : null);
  };

  // Slugun avtomatik yaradılması
  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/ə/g, 'e')
      .replace(/ç/g, 'c')
      .replace(/ş/g, 's')
      .replace(/ğ/g, 'g')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    return slug;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setCurrentPost(prev => {
      if (!prev) return null;
      
      // Əgər slug boşdursa və ya avtomatik yaradılmışsa, yeniləyirik
      const shouldUpdateSlug = !prev.slug || prev.slug === generateSlug(prev.title || '');
      
      return {
        ...prev,
        title,
        slug: shouldUpdateSlug ? generateSlug(title) : prev.slug
      };
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{t('blog')}</h1>
        <button
          onClick={handleAddPost}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Məqalə
        </button>
      </div>

      {/* Axtarış Paneli */}
      <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Məqalə axtar..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Bloq Məqalələri Cədvəli */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Məqalə
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müəllif
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Əməliyyatlar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                        {post.imageUrl ? (
                          <img
                            className="h-12 w-12 object-cover"
                            src={post.imageUrl}
                            alt={post.title}
                          />
                        ) : (
                          <Calendar className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-1">{post.excerpt}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{post.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{post.publishDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full 
                      ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {post.status === 'published' ? 'Dərc edilib' : 'Qaralama'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Redaktə et"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(post)}
                        className="text-red-600 hover:text-red-900"
                        title="Sil"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Məqalə Əlavə/Redaktə Modalı */}
      {isModalOpen && currentPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {posts.some(p => p.id === currentPost.id) ? 'Məqaləni Redaktə Et' : 'Yeni Məqalə Əlavə Et'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Başlıq</label>
                <input
                  type="text"
                  name="title"
                  value={currentPost.title || ''}
                  onChange={handleTitleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                <input
                  type="text"
                  name="slug"
                  value={currentPost.slug || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">Boş buraxsanız, avtomatik yaradılacaq</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qısa Məzmun</label>
                <textarea
                  name="excerpt"
                  value={currentPost.excerpt || ''}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Məzmun</label>
                <textarea
                  name="content"
                  value={currentPost.content || ''}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Müəllif</label>
                  <input
                    type="text"
                    name="author"
                    value={currentPost.author || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dərc Tarixi</label>
                  <input
                    type="date"
                    name="publishDate"
                    value={currentPost.publishDate || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Şəkil URL</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={currentPost.imageUrl || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={currentPost.status || 'draft'}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="draft">Qaralama</option>
                    <option value="published">Dərc edilib</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Ləğv et
                </button>
                <button
                  type="button"
                  onClick={handleSavePost}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Yadda saxla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Silmə Təsdiq Modalı */}
      {isDeleteModalOpen && postToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Silməyi təsdiqləyin</h2>
            <p className="text-gray-600 mb-6">
              <span className="font-medium">{postToDelete.title}</span> məqaləsini silmək istədiyinizə əminsiniz?
              Bu əməliyyat geri qaytarıla bilməz.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Ləğv et
              </button>
              <button
                type="button"
                onClick={handleDeletePost}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog; 