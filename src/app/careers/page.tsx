import type { Metadata } from 'next'
import Image from 'next/image'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Careers | Solani Construction Limited',
  description: 'Join Solani Construction Limited - Build your career with Ghana\'s premier construction specialists. Explore exciting opportunities in engineering, construction management, and more.',
  keywords: ['careers', 'jobs', 'construction jobs', 'Ghana jobs', 'engineering careers', 'Bibiani'],
  alternates: {
    canonical: 'https://solaniconstruction.com/careers',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solaniconstruction.com/careers',
    siteName: 'Solani Construction Limited',
    title: 'Careers at Solani Construction Limited',
    description: 'Join Ghana\'s premier construction specialists. Build your career with us.',
    images: [
      {
        url: 'https://solaniconstruction.com/team.jpg',
        width: 1200,
        height: 630,
        alt: 'Solani Construction Team',
      },
    ],
  },
}

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  postedDate: string
}

const jobListings: Job[] = [
  {
    id: 'civil-engineer-001',
    title: 'Civil Engineer',
    department: 'Engineering',
    location: 'Bibiani, Western North Region',
    type: 'Full-time',
    experience: 'Mid-level (3-5 years)',
    description: 'We are seeking an experienced Civil Engineer to oversee construction projects, ensure structural integrity, and coordinate with multidisciplinary teams.',
    responsibilities: [
      'Design and supervise construction of roads, bridges, and infrastructure projects',
      'Conduct site inspections and ensure compliance with safety standards',
      'Prepare technical reports, project plans, and cost estimates',
      'Collaborate with architects, contractors, and project managers',
      'Monitor project timelines and budgets',
    ],
    requirements: [
      'Bachelor\'s degree in Civil Engineering or related field',
      'Minimum 3 years of experience in construction or infrastructure projects',
      'Professional Engineering license or working towards certification',
      'Proficiency in AutoCAD, Civil 3D, or similar design software',
      'Strong problem-solving and communication skills',
      'Willingness to travel to project sites across Ghana',
    ],
    benefits: [
      'Competitive salary package',
      'Professional development and training opportunities',
      'Health insurance coverage',
      'Transportation allowance',
      'Career advancement opportunities',
    ],
    postedDate: '2025-10-15',
  },
  {
    id: 'project-manager-002',
    title: 'Project Manager',
    department: 'Construction Management',
    location: 'Bibiani / Accra',
    type: 'Full-time',
    experience: 'Senior (5+ years)',
    description: 'Lead large-scale construction projects from inception to completion, managing budgets, timelines, and stakeholder relationships.',
    responsibilities: [
      'Oversee all phases of construction projects including planning, execution, and closeout',
      'Manage project budgets, schedules, and resource allocation',
      'Coordinate with clients, contractors, and government agencies',
      'Ensure quality control and adherence to safety regulations',
      'Prepare progress reports and presentations for stakeholders',
      'Lead project teams and resolve on-site challenges',
    ],
    requirements: [
      'Bachelor\'s degree in Construction Management, Engineering, or related field',
      'Minimum 5 years of project management experience in construction',
      'PMP certification or equivalent is a plus',
      'Proven track record of delivering projects on time and within budget',
      'Excellent leadership and negotiation skills',
      'Strong knowledge of Ghana\'s construction regulations and standards',
    ],
    benefits: [
      'Attractive compensation package with performance bonuses',
      'Company vehicle and fuel allowance',
      'Comprehensive health and life insurance',
      'Retirement savings plan',
      'Leadership development programs',
    ],
    postedDate: '2025-10-20',
  },
  {
    id: 'surveyor-003',
    title: 'Land Surveyor',
    department: 'Engineering',
    location: 'Bibiani, Western North Region',
    type: 'Full-time',
    experience: 'Entry to Mid-level (1-3 years)',
    description: 'Join our engineering team as a Land Surveyor to conduct precise measurements and mapping for construction and infrastructure projects.',
    responsibilities: [
      'Conduct land surveys using GPS, total stations, and other surveying equipment',
      'Prepare survey reports, maps, and legal descriptions',
      'Mark boundaries and establish reference points for construction',
      'Collaborate with engineers and architects on project planning',
      'Maintain accurate records and documentation',
    ],
    requirements: [
      'Diploma or degree in Land Surveying, Geomatics, or related field',
      'Minimum 1 year of surveying experience (internships accepted)',
      'Proficiency with surveying instruments and software (e.g., AutoCAD, GPS)',
      'Strong attention to detail and mathematical skills',
      'Physical fitness for fieldwork in various weather conditions',
      'Valid driver\'s license',
    ],
    benefits: [
      'Competitive entry-level salary',
      'On-the-job training and skill development',
      'Safety equipment and field gear provided',
      'Health insurance',
      'Transportation support',
    ],
    postedDate: '2025-10-28',
  },
  {
    id: 'procurement-officer-004',
    title: 'Procurement Officer',
    department: 'Supply Chain & Logistics',
    location: 'Bibiani, Western North Region',
    type: 'Full-time',
    experience: 'Mid-level (2-4 years)',
    description: 'Manage procurement of construction materials, mining equipment, and industrial supplies to support our operations across Ghana.',
    responsibilities: [
      'Source and negotiate with suppliers for construction materials and equipment',
      'Manage vendor relationships and evaluate supplier performance',
      'Process purchase orders and ensure timely delivery of materials',
      'Monitor inventory levels and coordinate with warehouse teams',
      'Ensure compliance with company procurement policies and budgets',
    ],
    requirements: [
      'Bachelor\'s degree in Supply Chain Management, Business Administration, or related field',
      'Minimum 2 years of procurement experience, preferably in construction or mining',
      'Strong negotiation and vendor management skills',
      'Proficiency in procurement software and Microsoft Office Suite',
      'Knowledge of Ghana\'s import/export regulations is a plus',
      'Excellent organizational and communication skills',
    ],
    benefits: [
      'Competitive salary',
      'Performance-based incentives',
      'Health insurance',
      'Professional certification support',
      'Career growth opportunities',
    ],
    postedDate: '2025-11-01',
  },
  {
    id: 'safety-officer-005',
    title: 'Health & Safety Officer',
    department: 'Safety & Compliance',
    location: 'Various project sites across Ghana',
    type: 'Full-time',
    experience: 'Mid-level (3-5 years)',
    description: 'Ensure workplace safety and regulatory compliance across our construction sites, protecting our most valuable asset—our people.',
    responsibilities: [
      'Develop and implement health and safety programs for construction sites',
      'Conduct regular site inspections and safety audits',
      'Investigate incidents and prepare safety reports',
      'Deliver safety training sessions to workers and contractors',
      'Ensure compliance with Ghana Labour Act and international safety standards',
      'Maintain safety records and documentation',
    ],
    requirements: [
      'Bachelor\'s degree in Occupational Health & Safety, Environmental Science, or related field',
      'Minimum 3 years of experience as a safety officer in construction',
      'NEBOSH or IOSH certification preferred',
      'In-depth knowledge of Ghana\'s health and safety regulations',
      'Strong communication and training delivery skills',
      'Ability to work independently across multiple project sites',
    ],
    benefits: [
      'Competitive salary package',
      'Company vehicle for site visits',
      'Professional development and certification support',
      'Health and life insurance',
      'Safety equipment provided',
    ],
    postedDate: '2025-11-02',
  },
  {
    id: 'admin-assistant-006',
    title: 'Administrative Assistant',
    department: 'Administration',
    location: 'Bibiani, Western North Region',
    type: 'Full-time',
    experience: 'Entry-level (0-2 years)',
    description: 'Support our head office operations by managing administrative tasks, coordinating schedules, and ensuring smooth day-to-day operations.',
    responsibilities: [
      'Manage office correspondence, phone calls, and emails',
      'Schedule meetings and maintain executive calendars',
      'Prepare documents, reports, and presentations',
      'Coordinate travel arrangements and accommodations',
      'Maintain office supplies and equipment',
      'Assist with filing, data entry, and record keeping',
    ],
    requirements: [
      'Diploma or degree in Business Administration, Secretarial Studies, or related field',
      'Proficiency in Microsoft Office Suite (Word, Excel, PowerPoint)',
      'Excellent written and verbal communication skills',
      'Strong organizational and time management abilities',
      'Professional demeanor and attention to detail',
      'Previous administrative experience is a plus but not required',
    ],
    benefits: [
      'Competitive entry-level salary',
      'On-the-job training',
      'Health insurance',
      'Friendly work environment',
      'Career advancement opportunities',
    ],
    postedDate: '2025-11-03',
  },
]

export default function CareersPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/team.jpg"
            alt="Solani Construction Team"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
        
        <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 mb-6 block">
            Join Our Team
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 leading-tight">
            Build Your Future with Solani
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Join Ghana&apos;s premier construction specialists and be part of projects that shape communities, 
            develop infrastructure, and create lasting impact across West Africa.
          </p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4 border-b-4 border-orange-500 inline-block pb-2">
              Open Positions
            </h2>
          </div>

          <div className="flex justify-center items-center">
            <div className="text-center">
              <p className="text-slate-600">
                Currently, we do not have any open positions. Please check back later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Submit your application by sending your CV and cover letter to our recruitment team. 
            We review all applications and will contact shortlisted candidates for interviews.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:solanigloballtd@yahoo.com?subject=Job Application - [Position Title]"
              className="px-8 py-4 bg-orange-500 text-white font-bold uppercase text-sm tracking-wider hover:bg-orange-600 transition-colors"
            >
              Apply via Email
            </a>
            <a
              href="tel:+233248212624"
              className="px-8 py-4 border-2 border-white text-white font-bold uppercase text-sm tracking-wider hover:bg-white hover:text-slate-900 transition-colors"
            >
              Call: +233 24 821 2624
            </a>
          </div>

          <p className="text-xs text-slate-400 mt-8 uppercase tracking-wider">
            Email: solanigloballtd@yahoo.com
          </p>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="/team.jpg"
                alt="Solani Construction Team"
                fill
                className="object-cover"
              />
            </div>
            
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-orange-500 mb-4 block">
                Our Culture
              </span>
              <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6 leading-tight">
                A Team That Builds Together
              </h2>
              <p className="text-slate-700 mb-4 leading-relaxed">
                At Solani Construction, we foster a culture of collaboration, respect, and continuous learning. 
                Our diverse team brings together engineers, builders, managers, and support staff who share 
                a common commitment to excellence.
              </p>
              <p className="text-slate-700 mb-6 leading-relaxed">
                We believe in empowering our employees with the tools, training, and opportunities they need 
                to excel in their careers while contributing to meaningful projects that improve lives.
              </p>
              <div className="border-l-4 border-orange-500 pl-6 py-4 bg-slate-50">
                <p className="text-slate-900 font-bold italic">
                  &ldquo;Join us in building not just structures, but a legacy of quality, 
                  integrity, and community development across Ghana.&rdquo;
                </p>
                <p className="text-sm text-slate-600 mt-2">— Solomon Aniah, CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
