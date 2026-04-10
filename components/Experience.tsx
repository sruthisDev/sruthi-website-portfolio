'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FlaskConical, Briefcase } from 'lucide-react'

const experiences = [
  {
    type: 'research',
    title: 'Research Assistant',
    company: 'University of the Pacific',
    location: 'Stockton, CA',
    period: 'March 2025 – Present',
    project: 'A Modular Architecture for Domain-Adaptive Retrieval-Augmented Generation Systems',
    bullets: [
      'Designed and implemented a modular RAG architecture addressing the gap between benchmarking frameworks like FlashRAG and deployment frameworks (LangChain, LlamaIndex), enabling configuration-driven experimentation without architectural changes.',
      'Built end-to-end system using ReactJS, FastAPI, and ChromaDB incorporating query rewriting, re-ranking, session-aware interaction, and RBAC-based access control for multi-user environments. Integrated persistent storage and latency benchmarking infrastructure for reproducible cross-domain RAG evaluation.',
      'Evaluated retrieval performance across biomedical and Sanskrit philosophical corpora using Recall@K, MRR, and RAGAS, demonstrating high domain sensitivity to component selection.',
      'Paper under review — IEEE BigData Service: "A Modular Architecture for Domain-Adaptive Retrieval-Augmented Generation Systems"',
    ],
    tech: ['Python', 'ChromaDB', 'HuggingFace', 'Ollama', 'FastAPI', 'ReactJS'],
  },
  {
    type: 'research',
    title: 'Research Assistant',
    company: 'University of the Pacific',
    location: 'Stockton, CA',
    period: 'June 2025 – Dec 2025',
    project: 'Position & Sleep Tracking via Wearable Sensor Data',
    bullets: [
      'Developed ML models using PyTorch and Scikit-learn to analyze wearable sensor data streams for IoT-based health monitoring, improving anomaly detection accuracy by 28%.',
      'Engineered time-series feature extraction pipelines for environmental and motion-based datasets, enhancing predictive model performance across multiple sensor modalities.',
      'Built Flask-based RESTful services integrated with React dashboards to deliver real-time sensor insights and model outputs to end users.',
    ],
    tech: ['Python', 'PyTorch', 'Scikit-learn', 'Flask', 'React', 'Pandas', 'NumPy'],
  },
  {
    type: 'industry',
    title: 'AI/ML Intern',
    company: 'PNC, USA',
    location: 'USA',
    period: 'Jan 2024 – July 2024',
    bullets: [
      'Built end-to-end ML pipelines using AWS SageMaker and Airflow for financial risk systems, improving processing efficiency by 30%.',
      'Developed NLP-based fraud detection models leveraging LLMs and ensemble ML techniques, reducing detection latency by 15% and improving real-time risk scoring accuracy.',
      'Designed and deployed scalable ML services via Java Spring Boot microservices, Docker, and Kubernetes across cloud environments, ensuring high availability and seamless enterprise integration.',
    ],
    tech: ['AWS SageMaker', 'Airflow', 'Python', 'LLMs', 'Spring Boot', 'Docker', 'Kubernetes'],
  },
  {
    type: 'industry',
    title: 'Software Developer',
    company: 'Tata Consultancy Services (TCS)',
    location: 'Hyderabad, India',
    period: 'July 2021 – April 2023',
    bullets: [
      'Developed and deployed ML models for predictive analytics on the Mars Petcare platform, improving forecasting accuracy by 25%.',
      'Implemented secure backend systems following OWASP guidelines for enterprise applications, improving performance by 20% and reducing vulnerabilities by 35%.',
      'Deployed and maintained scalable cloud solutions on AWS (EC2, S3, Lambda) supporting high availability.',
    ],
    tech: ['Python', 'ML Models', 'AWS', 'PHP', 'MySQL', 'OWASP'],
  },
  {
    type: 'industry',
    title: 'Web Developer',
    company: 'Hyper Interact Services',
    location: 'India',
    period: 'Feb 2020 – May 2021',
    bullets: [
      'Developed and managed web applications tailored for SEM campaigns.',
      'Created and optimized landing pages to enhance user engagement.',
    ],
    tech: ['Drupal', 'PHP', 'JavaScript', 'MySQL'],
  },
  {
    type: 'industry',
    title: 'Senior Software Engineer',
    company: 'Foray Software Private Limited',
    location: 'India',
    period: 'July 2019 – Oct 2019',
    bullets: [
      'Enhanced front-end inventory search functionality for Mars employees — 30% faster search, 15% increase in task efficiency.',
      'Partnered with cross-functional teams to integrate and ensure seamless functionality.',
    ],
    tech: ['Drupal', 'JavaScript', 'MySQL'],
  },
  {
    type: 'industry',
    title: 'Associate Analyst',
    company: 'PurpleTalk',
    location: 'India',
    period: 'Feb 2017 – June 2019',
    bullets: [
      'Canya App: Developed features enabling peer-to-peer digital services on Android.',
      'Cuckuu App: Built and unit tested a social networking alarm app. Received Best Performance Award.',
      'SILA: Developed and maintained the payment & invoice module within SILA Attendance Management. Received Best Employee Award.',
    ],
    tech: ['Yii Framework', 'MongoDB', 'JavaScript', 'jQuery'],
  },
  {
    type: 'research',
    title: 'Research Associate / Intern',
    company: 'Excellera (GVK Bio)',
    location: 'India',
    period: 'June 2015 – Dec 2016',
    bullets: [
      'Developed an automated visualization tool to map disease associations and biological pathways for target gene IDs, improving workflow efficiency by 25%.',
    ],
    tech: ['PHP', 'JavaScript', 'jQuery', 'Ajax', 'D3.js', 'HTML/CSS'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-24 px-4 bg-white dark:bg-[#0f172a]">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Work{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mt-2">
            7+ years across research and industry
          </p>
          <div className="section-divider" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-0 bottom-8 w-px bg-gradient-to-b from-amber-500 via-amber-500/40 to-transparent hidden sm:block" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="relative sm:pl-14"
              >
                {/* Dot */}
                <div
                  className={`absolute left-[14px] top-6 w-4 h-4 rounded-full border-2 hidden sm:block ${
                    exp.type === 'research'
                      ? 'bg-amber-400 border-amber-500 dark:bg-amber-500 dark:border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                      : 'bg-stone-300 border-stone-400 dark:bg-stone-600 dark:border-stone-500'
                  }`}
                />

                <div className="card-base p-6 hover:border-amber-500/25 dark:hover:border-amber-500/20 hover:shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        {exp.type === 'research' ? (
                          <FlaskConical size={15} className="text-amber-500 flex-shrink-0" />
                        ) : (
                          <Briefcase size={15} className="text-stone-400 flex-shrink-0" />
                        )}
                        <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
                          {exp.title}
                        </h3>
                      </div>
                      <p className="text-amber-600 dark:text-amber-400 font-semibold text-sm">
                        {exp.company}
                      </p>
                      {exp.project && (
                        <p className="text-stone-500 dark:text-stone-400 text-sm italic mt-0.5">
                          {exp.project}
                        </p>
                      )}
                    </div>
                    <div className="sm:text-right flex-shrink-0">
                      <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                        {exp.period}
                      </p>
                      <p className="text-xs text-stone-400 dark:text-stone-600 mt-0.5">
                        {exp.location}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2.5 text-sm text-stone-600 dark:text-stone-400">
                        <span className="text-amber-500 mt-1 flex-shrink-0 text-xs">◆</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span key={t} className="tag-amber">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
