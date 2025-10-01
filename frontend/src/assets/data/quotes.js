export const quotes = [
    {
      id: 1,
      text: "You are not your thoughts. You are the observer of your thoughts.",
      author: "Unknown"
    },
    {
      id: 2,
      text: "Healing is not linear. Some days will be harder than others, and that's okay.",
      author: "Unknown"
    },
    {
      id: 3,
      text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
      author: "Unknown"
    },
    {
      id: 4,
      text: "It's okay to not be okay. It's okay to ask for help.",
      author: "Unknown"
    },
    {
      id: 5,
      text: "You are stronger than you think, braver than you believe, and more loved than you know.",
      author: "A.A. Milne"
    },
    {
      id: 6,
      text: "Progress, not perfection. Every small step counts.",
      author: "Unknown"
    },
    {
      id: 7,
      text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious. Having feelings doesn't make you a negative person. It makes you human.",
      author: "Lori Deschene"
    },
    {
      id: 8,
      text: "Be gentle with yourself. You're doing the best you can.",
      author: "Unknown"
    },
    {
      id: 9,
      text: "Your story isn't over yet. Keep going.",
      author: "Unknown"
    },
    {
      id: 10,
      text: "Sometimes the bravest thing you can do is ask for help.",
      author: "Unknown"
    }
  ];
  
  export const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };
  
  export const getDailyQuote = () => {
    const today = new Date().getDate();
    const index = today % quotes.length;
    return quotes[index];
  };