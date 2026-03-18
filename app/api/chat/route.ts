import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const RESUME_CONTEXT = `
You are Sruthi's AI portfolio assistant. Answer questions about Sruthi Satyavarapu based solely on the information below. Be conversational, concise, and enthusiastic about her work. If asked something not in her resume, say you don't have that information but encourage them to reach out to her directly.

=== SRUTHI SATYAVARAPU — FULL PROFILE ===

CONTACT:
- Email: s.satyavarapu@u.pacific.edu
- Phone: +1 (510) 365-2100
- Location: Santa Clara, CA 95054
- GitHub: github.com/sruthisDev
- LinkedIn: linkedin.com/in/sruthi-satyavarapu/

SUMMARY:
Masters student with over 6 years of experience in software development, with growing expertise in data science, machine learning, and data visualization. Skilled in Python, with hands-on experience using Tableau and Scikit-learn. Eager to apply and expand skills in AI/ML roles focused on data-driven decision-making.

EDUCATION:
1. Master of Science in Computer Science — University of the Pacific, Stockton, CA (Aug 2024 – Present), GPA: 4.0
   Coursework: Machine Learning, Data Science, Storytelling & Visualization
2. Master of Science in Medical Software Technology — Manipal Institute of Technology, India (Aug 2014 – May 2016), GPA: 3.7
3. Bachelor of Engineering in Bio Medical Engineering — JNTU, India (Aug 2010 – May 2014), GPA: 3.3

WORK EXPERIENCE:

1. Research Assistant — University of the Pacific (June 2025 – Present)
   Project: Domain-Adaptive Modular Conversational AI Architecture (RAG Chatbots)
   - Designing a plug-and-play modular system for RAG chatbots — easy swapping of vector DBs, embedding models, LLMs
   - Built prototype: ReactJS frontend + FastAPI backend, ChromaDB for embedding-based retrieval with re-ranking & query expansion
   - Developing domain packs for scalable, reusable multi-domain deployment
   Technologies: Python, ChromaDB, HuggingFace, Ollama, FastAPI, ReactJS

2. Research Assistant — University of the Pacific (June 2025 – Present)
   Project: Position & Sleep Tracking using Wearable Sensor Data (Fall Detection)
   - Designing fall detection and sleep monitoring algorithms using multi-sensor wearable data (accelerometer, gyroscope, PPG)
   - Applying data preprocessing, feature extraction, and ML for activity classification
   Technologies: Python, Pandas, NumPy, Scikit-learn, Matplotlib

3. PHP Developer — Tata Consultancy Services (TCS), Hyderabad (July 2021 – March 2023)
   - Developed critical B2B applications for MARS PetCare portfolio
   - Improved server-side performance by 20%
   - Reduced vulnerabilities by 35% via OWASP Top 10 mitigations
   - Served as mentor and onboarding lead
   Technologies: PHP, MySQL, JavaScript, EzPublish

4. Web Developer — Hyper Interact Services (Feb 2020 – May 2021)
   - Developed web apps for SEM campaigns, optimized landing pages
   Technologies: Drupal, PHP, JavaScript, MySQL

5. Senior Software Engineer — Foray Software Private Limited (July 2019 – Oct 2019)
   - Enhanced inventory search for Mars employees: 30% faster search, 15% efficiency increase
   Technologies: Drupal, JavaScript, MySQL

6. Associate Analyst — PurpleTalk (Feb 2017 – June 2019)
   - Canya App: peer-to-peer digital services Android app
   - Cuckuu App: social networking alarm app — Best Performance Award
   - SILA: payment & invoice module for Attendance Management — Best Employee Award
   Technologies: Yii Framework, MongoDB, JavaScript, jQuery

7. Research Associate / Intern — Excellera (GVK Bio) (June 2015 – Dec 2016)
   - Built automated visualization tool for biological pathway mapping — 25% workflow improvement
   Technologies: PHP, JavaScript, jQuery, Ajax, D3.js, HTML/CSS

PROJECTS:

1. AI Companion for Senior Citizens [Ongoing]
   - AI-driven elderly care platform: medical data extraction, patient management, multimodal input
   Technologies: AWS Bedrock, MongoDB, FastAPI, React, Python

2. Modular RAG Chatbot Architecture [Ongoing / Research]
   - Plug-and-play RAG system for multi-domain adaptability
   Technologies: Python, ChromaDB, HuggingFace, Ollama, FastAPI, ReactJS

3. Strawberry Fruit Ripeness Classifier [Ongoing]
   - Supervised ML model to classify ripeness stages; authored white paper
   Technologies: Python, Scikit-learn, Pandas

4. Adidas Sales Dashboard [Completed]
   - Tableau dashboard analyzing 2023-2024 Adidas sales, regional trends, product insights
   Technologies: Python, Tableau

5. Weather & Music Trends Analysis [Ongoing]
   - Exploratory data analysis: music chart trends correlated with weather patterns
   Technologies: Python, Matplotlib, Seaborn, Tableau

6. Desert Survival Game [Completed]
   - Grid-based survival game with resource collection and crafting
   Technologies: C++

TECHNICAL SKILLS:
- Programming Languages: Python, PHP, JavaScript, TypeScript, C++
- AI/ML & Data Science: Scikit-learn, TensorFlow, HuggingFace, LangChain, Sentence Transformers, Pandas, NumPy, Matplotlib, Seaborn, Tableau, ChromaDB, Pinecone
- Web Development: ReactJS, FastAPI, HTML/CSS, Bootstrap, D3.js, jQuery, AJAX, Drupal, Yii, Laravel
- Databases: MySQL, MongoDB, ChromaDB, Pinecone
- Tools & Platforms: Git, GitHub, AWS Bedrock, Ollama

AVAILABILITY:
Sruthi is actively seeking AI/ML engineering roles and research collaborations. She is open to internships, full-time positions, and research partnerships.
`.trim()

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// OpenAI-compatible chat (used for Groq and OpenRouter)
async function callOpenAICompatible(
  baseUrl: string,
  apiKey: string,
  model: string,
  messages: ChatMessage[]
): Promise<string> {
  const body = {
    model,
    messages: [
      { role: 'system', content: RESUME_CONTEXT },
      ...messages.map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })),
    ],
  }

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = Object.assign(new Error('Provider error'), { status: res.status })
    throw error
  }

  const data = await res.json()
  return data.choices[0].message.content
}

async function callGemini(apiKey: string, messages: ChatMessage[]): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-lite',
    systemInstruction: RESUME_CONTEXT,
  })

  const prior = messages.slice(0, -1)
  const firstUserIdx = prior.findIndex((m) => m.role === 'user')
  const trimmed = firstUserIdx === -1 ? [] : prior.slice(firstUserIdx)

  const history = trimmed.map((m) => ({
    role: m.role === 'user' ? 'user' : ('model' as const),
    parts: [{ text: m.content }],
  }))

  const chat = model.startChat({ history })
  const lastMessage = messages[messages.length - 1]
  const result = await chat.sendMessage(lastMessage.content)
  return result.response.text()
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json()
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 })
    }

    const provider = (process.env.AI_PROVIDER ?? 'gemini').toLowerCase()
    let text: string

    if (provider === 'groq') {
      const apiKey = process.env.GROQ_API_KEY
      if (!apiKey) return NextResponse.json({ error: 'GROQ_API_KEY not configured' }, { status: 500 })
      text = await callOpenAICompatible('https://api.groq.com/openai/v1', apiKey, 'llama-3.3-70b-versatile', messages)
    } else if (provider === 'openrouter') {
      const apiKey = process.env.OPENROUTER_API_KEY
      if (!apiKey) return NextResponse.json({ error: 'OPENROUTER_API_KEY not configured' }, { status: 500 })
      text = await callOpenAICompatible('https://openrouter.ai/api/v1', apiKey, 'meta-llama/llama-3.3-70b-instruct:free', messages)
    } else {
      const apiKey = process.env.GEMINI_API_KEY
      if (!apiKey) return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 })
      text = await callGemini(apiKey, messages)
    }

    return NextResponse.json({ message: text })
  } catch (err: unknown) {
    console.error('Chat API error:', err)
    const status = (err as { status?: number }).status
    if (status === 429) {
      return NextResponse.json(
        { error: 'rate_limited', message: "I'm getting a lot of questions right now! Please wait a moment and try again." },
        { status: 429 }
      )
    }
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
