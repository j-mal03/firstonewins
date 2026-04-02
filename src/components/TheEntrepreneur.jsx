import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, ArrowRight, BrainCircuit, Download, Loader2, FileText, Save,
  Users, TrendingUp, Mic, Play, Pause, BarChart3, Heart, Lightbulb,
  MessageSquare, Star, BookOpen, Send, Plus, ThumbsUp, AlertTriangle,
  MessageCircle, Award, Coffee, Target, Calendar, Clock, Shield, CheckCircle
} from 'lucide-react';

// ============= DATA & CONFIGURATION =============

const INSPIRATIONAL_CONTENT = {
  quotes: [
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.", author: "Steve Jobs" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" }
  ],
  selfCareExercises: [
    { title: "Power Breathing", duration: "2 minutes", instructions: "Take 4 deep breaths: inhale for 4 counts, hold for 4, exhale for 6.", icon: "🫁" },
    { title: "Posture Reset", duration: "1 minute", instructions: "Stand up, roll your shoulders back 5 times, stretch your neck gently.", icon: "🧘‍♂️" },
    { title: "Gratitude Moment", duration: "30 seconds", instructions: "Think of one thing you're grateful for today.", icon: "🙏" },
    { title: "Vision Visualization", duration: "1 minute", instructions: "Close your eyes and visualize your business success.", icon: "✨" }
  ]
};

const BUSINESS_PLAN_SECTIONS = [
  { key: 'executiveSummary', title: 'Executive Summary', prompt: 'a compelling overview that captures your vision, mission, and unique value proposition.' },
  { key: 'companyDescription', title: 'Company Description', prompt: 'detailed information about your company structure, history, and the specific problems you solve.' },
  { key: 'marketAnalysis', title: 'Market Analysis', prompt: 'comprehensive research on your industry, target market, and competitive landscape.' },
  { key: 'organizationManagement', title: 'Organization & Management', prompt: 'your organizational structure, key team members, and operational workflow.' },
  { key: 'productsServices', title: 'Products or Services', prompt: 'detailed description of what you offer, including features and benefits.' },
  { key: 'marketingSales', title: 'Marketing & Sales', prompt: 'your strategy for reaching customers and driving sales.' },
  { key: 'financialProjections', title: 'Financial Projections', prompt: 'realistic financial forecasts including revenue and expenses.' }
];

const PRESENTATION_TUTORIALS = [
  { id: 'vc-pitch', title: 'Pitching to VCs', description: 'Master the art of presenting to venture capitalists', duration: '15 min', level: 'Advanced' },
  { id: 'elevator', title: 'Elevator Pitch', description: 'Craft compelling 60-second pitches', duration: '8 min', level: 'Beginner' },
  { id: 'investor-demo', title: 'Product Demo', description: 'Show your product effectively', duration: '12 min', level: 'Intermediate' },
  { id: 'bank-loan', title: 'Bank Presentations', description: 'Present financials to banks', duration: '10 min', level: 'Intermediate' }
];

// ============= MAIN COMPONENT =============

export default function TheEntrepreneur() {
  // Core State
  const [currentView, setCurrentView] = useState('dashboard');
  const [businessIdea, setBusinessIdea] = useState('');
  const [planData, setPlanData] = useState({});
  const [currentPlanStep, setCurrentPlanStep] = useState(0);

  // Presentation State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [presentationTab, setPresentationTab] = useState('tutorials');

  // Community State
  const [communityPosts, setCommunityPosts] = useState([
    { id: 1, type: 'win', author: 'Sarah Chen', avatar: 'SC', time: '2h ago',
      content: 'Just closed our Series A! The pitch deck templates helped immensely!', likes: 47, comments: 12 },
    { id: 2, type: 'opportunity', author: 'Marcus R.', avatar: 'MR', time: '4h ago',
      content: 'Major retail chain looking for sustainable packaging. DM me!', likes: 23, comments: 8 },
    { id: 3, type: 'threat', author: 'Jessica Kim', avatar: 'JK', time: '6h ago',
      content: 'New fintech regulations just dropped. Anyone else worried?', likes: 15, comments: 6 },
    { id: 4, type: 'learning', author: 'David T.', avatar: 'DT', time: '1d ago',
      content: 'Product launch flopped. Customer validation is everything!', likes: 89, comments: 24 }
  ]);

  const [newPost, setNewPost] = useState({ type: 'win', content: '' });
  const [chatMessages, setChatMessages] = useState([
    { id: 1, author: 'Alex', message: 'Anyone attending the startup conference?', time: '10:30 AM' },
    { id: 2, author: 'Emma', message: 'Yes! Looking forward to networking.', time: '10:35 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [communityTab, setCommunityTab] = useState('posts');

  // Peer Review State
  const [showPeerReview, setShowPeerReview] = useState(false);
  const [selectedReviewType, setSelectedReviewType] = useState('business-plan');
  const [reviewSubmissions, setReviewSubmissions] = useState([]);
  const [submissionContent, setSubmissionContent] = useState('');

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [showSelfCare, setShowSelfCare] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(null);
  const timerRef = useRef(null);

  // Progress State
  const [userProgress] = useState({
    businessPlanCompletion: 35,
    presentationSkills: 60,
    totalPracticeHours: 4.5,
    sessionsCompleted: 8,
    peerReviewsReceived: 3
  });

  // Post type configuration
  const postTypes = {
    win: { icon: Award, color: 'green', label: 'Win' },
    opportunity: { icon: Target, color: 'blue', label: 'Opportunity' },
    threat: { icon: AlertTriangle, color: 'orange', label: 'Threat' },
    learning: { icon: Lightbulb, color: 'purple', label: 'Learning' }
  };

  // Initialize with random quote
  useEffect(() => {
    const randomQuote = INSPIRATIONAL_CONTENT.quotes[Math.floor(Math.random() * INSPIRATIONAL_CONTENT.quotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingDuration(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // ============= FUNCTIONS =============

  const generateContent = async (section) => {
    if (!businessIdea.trim()) {
      alert('Please describe your business idea first');
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockContent = `This is AI-generated content for "${section.title}" based on your idea: "${businessIdea}".

This section covers ${section.prompt}

Key Points:
• Strategic alignment with market needs
• Competitive advantages identified
• Clear value proposition
• Measurable objectives and KPIs
• Risk mitigation strategies`;

    setPlanData(prev => ({ ...prev, [section.key]: mockContent }));
    setIsLoading(false);
  };

  const addPost = () => {
    if (!newPost.content.trim()) return;
    const post = {
      id: Date.now(),
      type: newPost.type,
      author: 'You',
      avatar: 'YU',
      time: 'now',
      content: newPost.content,
      likes: 0,
      comments: 0
    };
    setCommunityPosts([post, ...communityPosts]);
    setNewPost({ type: 'win', content: '' });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setChatMessages([...chatMessages, {
      id: Date.now(),
      author: 'You',
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage('');
  };

  const submitForReview = () => {
    if (!submissionContent.trim()) {
      alert('Please enter content to submit for review');
      return;
    }

    const newSubmission = {
      id: Date.now(),
      type: selectedReviewType,
      content: submissionContent,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      feedback: null
    };

    setReviewSubmissions([...reviewSubmissions, newSubmission]);
    setSubmissionContent('');
    setShowPeerReview(false);

    // Simulate receiving feedback after 3 seconds
    setTimeout(() => {
      setReviewSubmissions(prev => prev.map(sub =>
        sub.id === newSubmission.id
          ? {
              ...sub,
              status: 'reviewed',
              feedback: {
                score: 85,
                strengths: ['Clear value proposition', 'Well-structured content', 'Good market analysis'],
                improvements: ['Add more financial details', 'Include competitive analysis', 'Expand on team expertise'],
                reviewer: 'Expert Reviewer #' + Math.floor(Math.random() * 100)
              }
            }
          : sub
      ));
    }, 3000);
  };

  // ============= COMPONENTS =============

  const Navigation = () => (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="text-4xl">💰</span>
              <div>
                <h1 className="text-2xl font-bold">theEntrepreneur</h1>
                <p className="text-xs text-slate-400 italic">"Thoughtful risk-taker to establish and grow!"</p>
              </div>
            </div>

            <div className="hidden md:flex gap-4">
              {['dashboard', 'business-plan', 'presentation', 'community', 'peer-review'].map(view => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentView === view
                      ? 'bg-white text-slate-900 font-semibold'
                      : 'hover:bg-slate-700'
                  }`}
                >
                  {view.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowSelfCare(true)}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg hover:shadow-lg transition-all"
          >
            <Heart className="inline w-4 h-4 mr-2" />
            Self-Care
          </button>
        </div>
      </div>
    </nav>
  );

  const DashboardView = () => (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Welcome Back, Entrepreneur!</h2>
        {currentQuote && (
          <blockquote className="border-l-4 border-white/30 pl-4 italic">
            "{currentQuote.text}"
            <footer className="text-blue-200 mt-2">— {currentQuote.author}</footer>
          </blockquote>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-600 text-sm">Business Plan</h3>
          <div className="text-3xl font-bold text-blue-600">{userProgress.businessPlanCompletion}%</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-600 text-sm">Presentation Skills</h3>
          <div className="text-3xl font-bold text-green-600">{userProgress.presentationSkills}%</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-600 text-sm">Practice Hours</h3>
          <div className="text-3xl font-bold text-purple-600">{userProgress.totalPracticeHours}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-600 text-sm">Sessions</h3>
          <div className="text-3xl font-bold text-orange-600">{userProgress.sessionsCompleted}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-600 text-sm">Peer Reviews</h3>
          <div className="text-3xl font-bold text-pink-600">{userProgress.peerReviewsReceived}</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-dashed border-yellow-300 p-6 rounded-xl">
        <div className="flex items-center gap-4">
          <Star className="w-12 h-12 text-yellow-500" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => setCurrentView('business-plan')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Continue Business Plan
              </button>
              <button
                onClick={() => setCurrentView('presentation')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Practice Presentation
              </button>
              <button
                onClick={() => setShowPeerReview(true)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Submit for Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BusinessPlanView = () => {
    const currentSection = BUSINESS_PLAN_SECTIONS[currentPlanStep];

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Business Plan Development</h2>
            <span className="text-sm text-gray-500">Step {currentPlanStep + 1} of {BUSINESS_PLAN_SECTIONS.length}</span>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto">
            {BUSINESS_PLAN_SECTIONS.map((section, index) => (
              <button
                key={section.key}
                onClick={() => setCurrentPlanStep(index)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  index === currentPlanStep
                    ? 'bg-blue-600 text-white'
                    : index < currentPlanStep
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <label className="block text-lg font-semibold mb-3">Your Business Idea</label>
          <textarea
            value={businessIdea}
            onChange={(e) => setBusinessIdea(e.target.value)}
            placeholder="Describe your business concept in detail..."
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-2">{currentSection.title}</h3>
          <p className="text-gray-600 mb-4">This section should cover: {currentSection.prompt}</p>

          <button
            onClick={() => generateContent(currentSection)}
            disabled={isLoading || !businessIdea}
            className="w-full mb-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg transition-all"
          >
            {isLoading ? (
              <><Loader2 className="inline animate-spin mr-2" /> Generating...</>
            ) : (
              <><BrainCircuit className="inline mr-2" /> Generate with AI</>
            )}
          </button>

          <textarea
            value={planData[currentSection.key] || ''}
            onChange={(e) => setPlanData(prev => ({ ...prev, [currentSection.key]: e.target.value }))}
            placeholder="Content will appear here..."
            className="w-full p-4 border rounded-lg"
            rows="12"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentPlanStep(Math.max(0, currentPlanStep - 1))}
            disabled={currentPlanStep === 0}
            className="px-6 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
          >
            <ArrowLeft className="inline mr-2" /> Previous
          </button>
          <button
            onClick={() => setCurrentPlanStep(Math.min(BUSINESS_PLAN_SECTIONS.length - 1, currentPlanStep + 1))}
            disabled={currentPlanStep === BUSINESS_PLAN_SECTIONS.length - 1}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            Next <ArrowRight className="inline ml-2" />
          </button>
        </div>
      </div>
    );
  };

  const PresentationView = () => (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-4">You Better Say It!</h2>
        <p className="text-purple-100">Master the art of presentation and pitch your way to success.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        <div className="flex border-b">
          {['tutorials', 'practice', 'feedback'].map(tab => (
            <button
              key={tab}
              onClick={() => setPresentationTab(tab)}
              className={`flex-1 py-3 capitalize ${
                presentationTab === tab
                  ? 'border-b-2 border-purple-600 text-purple-600 font-semibold'
                  : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {presentationTab === 'tutorials' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRESENTATION_TUTORIALS.map(tutorial => (
                <div key={tutorial.id} className="border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer">
                  <h4 className="font-bold text-lg">{tutorial.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{tutorial.description}</p>
                  <div className="flex justify-between mt-3">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{tutorial.level}</span>
                    <span className="text-xs text-gray-500">{tutorial.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {presentationTab === 'practice' && (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="text-6xl font-bold text-purple-600">
                  {Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')}
                </div>
              </div>

              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`px-8 py-4 rounded-full text-white font-bold text-lg transition-all ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isRecording ? (
                  <><Pause className="inline mr-2" /> Stop Recording</>
                ) : (
                  <><Play className="inline mr-2" /> Start Practice</>
                )}
              </button>

              <p className="text-gray-600 mt-4">
                {isRecording ? "Recording in progress... Speak naturally and confidently!" : "Click to start your practice session"}
              </p>
            </div>
          )}

          {presentationTab === 'feedback' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-3">Last Session Analysis</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">Good</div>
                    <div className="text-sm text-gray-600">Pace</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">Clear</div>
                    <div className="text-sm text-gray-600">Clarity</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <div className="text-sm text-gray-600">Filler Words</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-semibold">Strengths:</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✓ Clear articulation and good volume</li>
                    <li>✓ Well-structured content flow</li>
                    <li>✓ Engaging opening statement</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const CommunityView = () => (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white p-8 rounded-2xl shadow-xl">
        <Coffee className="inline w-8 h-8 mr-3" />
        <h2 className="text-3xl font-bold inline">Mingle Lounge</h2>
        <p className="text-purple-100 mt-2">Where conversations and nightcaps turn to deals and dollars!</p>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-dashed border-yellow-300 p-6 rounded-xl">
        <div className="flex items-center gap-4">
          <span className="text-4xl">💰</span>
          <div>
            <h3 className="text-xl font-bold">Coming Soon: Mentorship</h3>
            <p className="text-gray-600">Connect with successful entrepreneurs who want to give back</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        <div className="flex border-b">
          <button
            onClick={() => setCommunityTab('posts')}
            className={`flex-1 py-3 ${communityTab === 'posts' ? 'border-b-2 border-purple-600 text-purple-600 font-semibold' : 'text-gray-600'}`}
          >
            <MessageSquare className="inline w-4 h-4 mr-2" /> Posts
          </button>
          <button
            onClick={() => setCommunityTab('chat')}
            className={`flex-1 py-3 ${communityTab === 'chat' ? 'border-b-2 border-purple-600 text-purple-600 font-semibold' : 'text-gray-600'}`}
          >
            <MessageCircle className="inline w-4 h-4 mr-2" /> Live Chat
          </button>
        </div>

        <div className="p-6">
          {communityTab === 'posts' && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex gap-2 mb-3">
                  {Object.entries(postTypes).map(([type, config]) => (
                    <button
                      key={type}
                      onClick={() => setNewPost(prev => ({ ...prev, type }))}
                      className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
                        newPost.type === type
                          ? `bg-${config.color}-100 text-${config.color}-700 border-2 border-${config.color}-300`
                          : 'bg-white border'
                      }`}
                    >
                      <config.icon className="w-3 h-3" />
                      {config.label}
                    </button>
                  ))}
                </div>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your experience..."
                  className="w-full p-3 border rounded-lg"
                  rows="3"
                />
                <button
                  onClick={addPost}
                  className="mt-3 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus className="inline w-4 h-4 mr-2" /> Share
                </button>
              </div>

              <div className="space-y-4">
                {communityPosts.map(post => {
                  const PostIcon = postTypes[post.type].icon;
                  return (
                    <div key={post.id} className="border rounded-lg p-4">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-sm">
                          {post.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{post.author}</span>
                            <span className={`text-xs px-2 py-1 rounded-full bg-${postTypes[post.type].color}-100 text-${postTypes[post.type].color}-700 flex items-center gap-1`}>
                              <PostIcon className="w-3 h-3" />
                              {postTypes[post.type].label}
                            </span>
                            <span className="text-xs text-gray-500">{post.time}</span>
                          </div>
                          <p className="text-gray-700">{post.content}</p>
                          <div className="flex gap-4 mt-3 text-sm text-gray-500">
                            <button className="hover:text-blue-600">
                              <ThumbsUp className="inline w-4 h-4 mr-1" /> {post.likes}
                            </button>
                            <button className="hover:text-blue-600">
                              <MessageCircle className="inline w-4 h-4 mr-1" /> {post.comments}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {communityTab === 'chat' && (
            <div>
              <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto mb-4 space-y-3">
                {chatMessages.map(msg => (
                  <div key={msg.id} className="flex gap-2">
                    <span className="font-semibold">{msg.author}:</span>
                    <span className="flex-1">{msg.message}</span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 p-3 border rounded-lg"
                />
                <button onClick={sendMessage} className="px-6 py-3 bg-purple-600 text-white rounded-lg">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const PeerReviewView = () => (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
        <Shield className="inline w-8 h-8 mr-3" />
        <h2 className="text-3xl font-bold inline">Peer Review Center</h2>
        <p className="text-indigo-100 mt-2">Submit your work for expert feedback and validation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Submit for Review</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Document Type</label>
              <select
                value={selectedReviewType}
                onChange={(e) => setSelectedReviewType(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="business-plan">Business Plan</option>
                <option value="marketing-plan">Marketing Plan</option>
                <option value="pitch-deck">Pitch Deck</option>
                <option value="grant-proposal">Grant Proposal</option>
                <option value="presentation">Presentation Script</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content to Review</label>
              <textarea
                value={submissionContent}
                onChange={(e) => setSubmissionContent(e.target.value)}
                placeholder="Paste your content here for peer review..."
                className="w-full p-3 border rounded-lg"
                rows="8"
              />
            </div>

            <button
              onClick={submitForReview}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Submit for Expert Review
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Review History</h3>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {reviewSubmissions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No submissions yet</p>
            ) : (
              reviewSubmissions.map(submission => (
                <div key={submission.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold capitalize">{submission.type.replace('-', ' ')}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      submission.status === 'reviewed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {submission.status}
                    </span>
                  </div>

                  {submission.feedback && (
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Score: {submission.feedback.score}/100</span>
                      </div>
                      <div>
                        <p className="font-medium text-green-700">Strengths:</p>
                        <ul className="ml-4 text-gray-600">
                          {submission.feedback.strengths.map((s, i) => (
                            <li key={i}>• {s}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-orange-700">Areas to Improve:</p>
                        <ul className="ml-4 text-gray-600">
                          {submission.feedback.improvements.map((i, idx) => (
                            <li key={idx}>• {i}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-gray-500 italic">Reviewed by: {submission.feedback.reviewer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const SelfCareModal = () => {
    const exercise = INSPIRATIONAL_CONTENT.selfCareExercises[
      Math.floor(Math.random() * INSPIRATIONAL_CONTENT.selfCareExercises.length)
    ];

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl max-w-md">
          <div className="text-center">
            <div className="text-6xl mb-4">{exercise.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{exercise.title}</h3>
            <p className="text-emerald-600 font-medium mb-4">Duration: {exercise.duration}</p>
            <p className="text-gray-700 mb-6">{exercise.instructions}</p>
            <button
              onClick={() => setShowSelfCare(false)}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold"
            >
              Continue Your Journey
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PeerReviewModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4">Submit for Peer Review</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Document Type</label>
            <select
              value={selectedReviewType}
              onChange={(e) => setSelectedReviewType(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="business-plan">Business Plan</option>
              <option value="marketing-plan">Marketing Plan</option>
              <option value="pitch-deck">Pitch Deck</option>
              <option value="grant-proposal">Grant Proposal</option>
              <option value="presentation">Presentation Script</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content for Review</label>
            <textarea
              value={submissionContent}
              onChange={(e) => setSubmissionContent(e.target.value)}
              placeholder="Paste or type your content here..."
              className="w-full p-3 border rounded-lg"
              rows="10"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={submitForReview}
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold"
            >
              Submit for Review
            </button>
            <button
              onClick={() => setShowPeerReview(false)}
              className="px-6 py-3 bg-gray-200 rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ============= MAIN RENDER =============

  const renderView = () => {
    switch (currentView) {
      case 'business-plan': return <BusinessPlanView />;
      case 'presentation': return <PresentationView />;
      case 'community': return <CommunityView />;
      case 'peer-review': return <PeerReviewView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto">
        {renderView()}
      </main>
      {showSelfCare && <SelfCareModal />}
      {showPeerReview && currentView === 'dashboard' && <PeerReviewModal />}
    </div>
  );
}
