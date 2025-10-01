// Mock Users
export const mockUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 22,
      bio: "College student dealing with anxiety. Love reading and yoga. Looking for someone who understands the pressure of academic life.",
      struggles: ["Anxiety", "Academic Stress"],
      interests: ["Reading", "Yoga", "Music"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      isOnline: true
    },
    {
      id: 2,
      name: "Mike Chen",
      age: 24,
      bio: "Recovering from depression. Into gaming and coding. Here to support and be supported.",
      struggles: ["Depression", "Social Anxiety"],
      interests: ["Gaming", "Coding", "Movies"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      isOnline: false
    },
    {
      id: 3,
      name: "Emma Williams",
      age: 21,
      bio: "Dealing with panic attacks. Art and nature help me cope. Let's support each other!",
      struggles: ["Panic Attacks", "Anxiety"],
      interests: ["Art", "Hiking", "Photography"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      isOnline: true
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      age: 23,
      bio: "Navigating through tough times. Fitness enthusiast. Believe in the power of community support.",
      struggles: ["Depression", "Low Self-esteem"],
      interests: ["Fitness", "Cooking", "Podcasts"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      isOnline: true
    },
    {
      id: 5,
      name: "Priya Patel",
      age: 20,
      bio: "Student struggling with OCD. Love journaling and meditation. Here to listen and share.",
      struggles: ["OCD", "Anxiety"],
      interests: ["Meditation", "Journaling", "Tea"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      isOnline: false
    }
  ];
  
  // Mock Journal Entries
  export const mockJournalEntries = [
    {
      id: 1,
      title: "A Better Day",
      content: "Today was surprisingly good. I managed to attend all my classes and even had lunch with a friend. Small wins matter.",
      mood: "happy",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["progress", "social"]
    },
    {
      id: 2,
      title: "Struggling with Sleep",
      content: "Another night of insomnia. My mind won't stop racing. Need to try those breathing exercises again.",
      mood: "anxious",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["sleep", "anxiety"]
    },
    {
      id: 3,
      title: "Grateful Moments",
      content: "Despite everything, I'm grateful for my support system. My roommate checked in on me today. It meant a lot.",
      mood: "grateful",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["gratitude", "support"]
    }
  ];
  
  // Mock Messages
  export const mockMessages = [
    {
      id: 1,
      userId: 1,
      senderId: 1,
      content: "Hey! How are you feeling today?",
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      isCurrentUser: false
    },
    {
      id: 2,
      userId: 1,
      senderId: 'current',
      content: "Hi Sarah! I'm doing okay, just trying to manage my anxiety before exams.",
      timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
      isCurrentUser: true
    },
    {
      id: 3,
      userId: 1,
      senderId: 1,
      content: "I totally understand that feeling. Have you tried the breathing exercises we talked about?",
      timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
      isCurrentUser: false
    }
  ];
  
  // Current User Mock
  export const mockCurrentUser = {
    id: 'current',
    name: "You",
    email: "user@example.com",
    age: 22,
    bio: "Just trying to take it one day at a time. Open to connecting with supportive people.",
    struggles: ["Anxiety", "Stress"],
    interests: ["Music", "Walking", "Writing"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Current",
    isOnline: true
  };
  
  // Emergency Resources
  export const emergencyResources = [
    {
      id: 1,
      name: "National Suicide Prevention Lifeline (US)",
      phone: "988",
      description: "24/7 free and confidential support for people in distress",
      country: "United States"
    },
    {
      id: 2,
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "24/7 text support for people in crisis",
      country: "United States"
    },
    {
      id: 3,
      name: "SAMHSA National Helpline",
      phone: "1-800-662-4357",
      description: "Treatment referral and information service",
      country: "United States"
    },
    {
      id: 4,
      name: "Vandrevala Foundation (India)",
      phone: "+91 9999 666 555",
      description: "24/7 mental health support helpline",
      country: "India"
    },
    {
      id: 5,
      name: "iCall - TISS (India)",
      phone: "+91 22 2556 3291",
      description: "Psychosocial counseling helpline",
      country: "India"
    }
  ];