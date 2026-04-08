import React from 'react';
import { BookOpen, Users, Pen, Globe, Heart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { useNavigate } from 'react-router-dom';

export default function About() {
    const navigate = useNavigate()
  const features = [
    {
      icon: <Pen className="w-6 h-6" />,
      title: "Easy Publishing",
      description: "Create and publish beautiful blog posts with our intuitive editor. Write, format, and share your stories effortlessly."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Vibrant Community",
      description: "Connect with writers and readers from around the world. Build your audience and engage with like-minded individuals."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Reach",
      description: "Share your thoughts with a worldwide audience. Your voice matters, and BlogHub helps amplify it."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analytics & Insights",
      description: "Track your blog's performance with detailed analytics. Understand your audience and grow your reach."
    }
  ];

  const teamMembers = [
    {
      name: "Akash Kumar",
      role: "Web Developer & Founder",
      description: "Passionate about empowering voices through technology."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-12 h-12 mr-3" />
            <h1 className="text-5xl font-bold">BlogHub</h1>
          </div>
          <p className="text-xl text-center max-w-3xl mx-auto text-blue-100">
            Where stories come to life and voices are heard. Join thousands of writers and readers in building the world's most vibrant blogging community.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">My Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
           At BlogHub, I believe every voice matters. My mission is to empower writers to share their stories, connect with readers, and build communities around what they love
            </p>
            <div className="flex gap-2 flex-wrap mt-6">
              <Badge variant="secondary" className="text-sm py-1 px-3">Innovation</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">Community</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">Creativity</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3">Empowerment</Badge>
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
            <img src="/images/Mymissionimage.jpg" alt="" />
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose BlogHub?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-blue-500 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Meet Our Developer</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
           I’m a developer and storyteller dedicated to building BlogHub — a platform designed to empower creators, foster creativity, and bring communities together.
          </p>
         <div className="relative w-[250px] h-[400px] mx-auto rounded-lg overflow-hidden shadow-2xl mb-12">
          <img
            src="/images/1775472775595.jpg"
            alt="portrait"
            className="w-full h-full object-cover"
          />
        </div>
          <div className="grid md:grid-cols-2 gap-6 ml-96">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl order-2 md:order-1">
          <img className='w-auto object-cover rounded-lg' src="/images/laptopwithtea.jpg" alt="join our community" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Join Our Community</h2>
            <p className="text-lg text-gray-700 mb-4">
             BlogHub goes beyond being a publishing platform by fostering a collaborative community of writers and readers who inspire, support, and grow together through shared knowledge and creativity.
            </p>
            <div className="flex items-center gap-3 text-blue-600 mb-3">
              <Heart className="w-5 h-5" />
              <span className="text-gray-700">Supportive and encouraging environment</span>
            </div>
            <div className="flex items-center gap-3 text-blue-600 mb-3">
              <Heart className="w-5 h-5" />
              <span className="text-gray-700">Regular community events and challenges</span>
            </div>
            <div className="flex items-center gap-3 text-blue-600">
              <Heart className="w-5 h-5" />
              <span className="text-gray-700">Opportunities to collaborate and network</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Blogging Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join BlogHub today and become part of a community that values your voice.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={()=>navigate('/signup')} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 mr-2" />
            <span className="text-2xl font-bold">BlogHub</span>
          </div>
          <p className="text-gray-400 mb-4">Empowering voices, one story at a time.</p>
          <p className="text-gray-500 text-sm">&copy; 2026 BlogHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
