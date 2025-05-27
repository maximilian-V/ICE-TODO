'use client'

import Link from 'next/link'
import { Zap, Shield, CheckCircle, TrendingUp, Users, Target, BarChart3, Brain, Calendar, MessageSquare, FileText, Search, Sparkles } from 'lucide-react'
import AuroraText from '@/components/ui/aurora-text'
import MagicCard from '@/components/ui/magic-card'
import RippleButton from '@/components/ui/ripple-button'

import { Button } from '@/components/ui/button'

export function LandingPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="text-2xl font-bold text-gray-900">
                                <AuroraText>ice</AuroraText>
                            </Link>
                            <nav className="hidden md:flex items-center gap-6">
                                <Link href="#platform" className="text-gray-600 hover:text-gray-900 transition-colors">Platform</Link>
                                <Link href="#methodology" className="text-gray-600 hover:text-gray-900 transition-colors">ICE Methodology</Link>
                                <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it works</Link>
                                <Link href="#templates" className="text-gray-600 hover:text-gray-900 transition-colors">Templates</Link>
                                <Link href="/demo" className="text-gray-600 hover:text-gray-900 transition-colors">Demo</Link>
                                <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 transition-colors">Log in</Link>
                            <Link href="/auth/signup">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Announcement Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <div className="max-w-7xl mx-auto px-6 py-3">
                    <div className="text-center">
                        <span className="text-blue-800 font-medium">
                            🚀 We just launched the most advanced ICE scoring system for priority management
                        </span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
                            Complete
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                                Priority Management
                            </span>
                            <br />
                            Automation
                        </h1>
                        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Automate the chaos in your workflow with the most advanced ICE scoring system, no complex setup required.
                        </p>
                        <Link href="/demo">
                            <RippleButton className="px-8 py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white">
                                Get a Demo
                            </RippleButton>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6 text-gray-900">
                            An AI-powered system of action for productivity
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-gray-700">Create an army of personalized ICE scorecards that work for you 24/7</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                            <span className="text-gray-700">Leverage ICE&apos;s built-in AI deep task analysis to uncover priority-critical insights</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                            <span className="text-gray-700">Action priority insights with targeted workflows across teams and projects</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-gray-700">ICE agents plug seamlessly into your CRM and favorite productivity tools</span>
                        </div>
                    </div>

                    {/* Integration Logos */}
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                        <div className="flex items-center gap-2 text-gray-500 font-semibold">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">SF</span>
                            </div>
                            Salesforce
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 font-semibold">
                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">O</span>
                            </div>
                            Outlook
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 font-semibold">
                            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">H</span>
                            </div>
                            HubSpot
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 font-semibold">
                            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">G</span>
                            </div>
                            Gmail
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 font-semibold">
                            <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">P</span>
                            </div>
                            Pipedrive
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 font-semibold">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">GC</span>
                            </div>
                            Google Calendar
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 font-semibold">
                            <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">Li</span>
                            </div>
                            LinkedIn
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-gray-600 font-medium">Trusted by the best strategic teams</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 mt-6 opacity-40">
                            <span className="text-gray-500 font-bold">MICROSOFT</span>
                            <span className="text-gray-500 font-bold">GOOGLE</span>
                            <span className="text-gray-500 font-bold">ORACLE</span>
                            <span className="text-gray-500 font-bold">NVIDIA</span>
                            <span className="text-gray-500 font-bold">SALESFORCE</span>
                            <span className="text-gray-500 font-bold">ADOBE</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ICE Agents Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6 text-gray-900">
                            ICE Agents that Make Humans the Stars of the Show
                        </h2>
                    </div>

                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold mb-12 text-gray-900">
                            Collaborate with ICE agents to 10x productivity performance
                        </h3>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-20">
                        {/* Example 1 */}
                        <div className="space-y-6">
                            <div className="text-lg text-gray-700">
                                <strong>A product manager...</strong>
                            </div>
                            <p className="text-gray-600">
                                Researches the highest impact features in their backlog, then identifies and scores decision criteria
                            </p>
                            <MagicCard className="p-6 bg-white border-gray-200" gradientColor="#2563eb">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Target className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Feature Analytics Dashboard</h4>
                                            <p className="text-sm text-gray-600">Sarah Davis, Product Lead</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Goal: Increase user engagement</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Team budget: $500K</span>
                                            <span className="text-blue-600 font-medium">ICE Score: 672</span>
                                        </div>
                                        <div className="text-sm text-gray-600">Open initiatives: 3</div>
                                    </div>
                                </div>
                            </MagicCard>
                        </div>

                        {/* Example 2 */}
                        <div className="space-y-6">
                            <div className="text-lg text-gray-700">
                                <strong>A marketing team...</strong>
                            </div>
                            <p className="text-gray-600">
                                Runs hyper-focused campaigns targeting high-impact channels that have recently shown strong performance
                            </p>
                            <MagicCard className="p-6 bg-white border-gray-200" gradientColor="#0891b2">
                                <div className="space-y-4">
                                    <div className="text-sm text-gray-600">To: Social Media Campaign</div>
                                    <div className="font-semibold text-gray-900">Subject: Q4 LinkedIn Strategy</div>
                                    <div className="text-gray-700">Dear Marketing Team,</div>
                                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                                        Based on ICE analysis, LinkedIn campaigns show 3x higher engagement rates...
                                    </div>
                                </div>
                            </MagicCard>
                        </div>

                        {/* Example 3 */}
                        <div className="space-y-6">
                            <div className="text-lg text-gray-700">
                                <strong>A startup founder...</strong>
                            </div>
                            <p className="text-gray-600">
                                Qualifies feature requests and writes 1:1 development priorities referencing similar successful products
                            </p>
                            <MagicCard className="p-6 bg-white border-gray-200" gradientColor="#7c3aed">
                                <div className="space-y-4">
                                    <div className="font-semibold text-gray-900">Feature Qualification</div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <span className="text-gray-900 font-medium">TechStartup Inc.</span>
                                        </div>
                                        <div className="text-sm text-gray-600">Strong ICE Match</div>
                                        <div className="text-sm text-gray-600">Similar to Slack&apos;s notification system</div>
                                        <div className="text-sm text-gray-600">Key decision maker: Maria Johnson (CTO)</div>
                                        <div className="text-sm text-blue-600">3 touchpoints referencing Discord case study</div>
                                    </div>
                                </div>
                            </MagicCard>
                        </div>

                        {/* Example 4 */}
                        <div className="space-y-6">
                            <div className="text-lg text-gray-700">
                                <strong>An operations team...</strong>
                            </div>
                            <p className="text-gray-600">
                                Guides strategic decisions by dynamically analyzing external market, competitor and efficiency research
                            </p>
                            <MagicCard className="p-6 bg-white border-gray-200" gradientColor="#059669">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="font-semibold text-gray-900">Market Analysis</div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-xs text-gray-600">Live</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div>Remote work trends will impact office space needs by 25% in Q3.</div>
                                        <div>Recent competitor moves detected: 2 new automation tools</div>
                                        <div>Market forecast suggests 15% increase in demand for productivity software.</div>
                                        <div>New AI-powered tools showing 40% higher adoption rates among teams.</div>
                                    </div>
                                </div>
                            </MagicCard>
                        </div>
                    </div>
                </div>
            </section>

            {/* Templates Section */}
            <section id="templates" className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6 text-gray-900">
                            Get started with our ICE templates, or build your own
                        </h2>
                        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                            Try our starter templates
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[
                            { icon: Search, title: "Task Finder", desc: "Filtered lists, lookalikes, dynamic scoring" },
                            { icon: Target, title: "Priority Ranker", desc: "Use any data and research insights" },
                            { icon: Users, title: "Team Triager", desc: "Auto-qualify, enrich, sequence and track" },
                            { icon: Zap, title: "Impact Scorer", desc: "Leverage unique data, omni-channel analysis" },
                            { icon: Calendar, title: "Meeting Prepper", desc: "Research attendees, brainstorm personalized questions" },
                            { icon: TrendingUp, title: "Signal Tracker", desc: "Always stay in the know with alerts for changes" },
                            { icon: MessageSquare, title: "Stakeholder Mapper", desc: "Identify and engage decision makers with relevant deliverables" },
                            { icon: FileText, title: "Handoff Assistant", desc: "Ensure team members always have up-to-date insights" },
                            { icon: BarChart3, title: "Project Planner", desc: "Research, identify and action new opportunities" },
                            { icon: Shield, title: "Risk Assessor", desc: "Generate SWOT analysis, risk matrices, value pyramids" },
                            { icon: Brain, title: "Competitor Researcher", desc: "Research your competitors, their strategies, and their teams" },
                            { icon: Sparkles, title: "Custom Agent", desc: "If you can dream it, you can build it 🧙🪄" }
                        ].map((template, index) => (
                            <MagicCard key={index} className="p-6 bg-white border-gray-200 h-48 flex flex-col" gradientColor="#3b82f6">
                                <div className="flex-1">
                                    <template.icon className="w-8 h-8 text-blue-600 mb-4" />
                                    <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
                                    <p className="text-sm text-gray-600">{template.desc}</p>
                                </div>
                            </MagicCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6 text-gray-900">How ICE Works</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Build AI ICE agents in 15 minutes or less, no technical skills required
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-blue-600">1</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Create a knowledge base</h3>
                            <p className="text-gray-600">
                                Train an ICE agent that understands your priorities, constraints and success metrics
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-cyan-600">2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Build an agent</h3>
                            <p className="text-gray-600">
                                Deploy agents using a super simple chat-based interface
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-purple-600">3</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Test & deploy</h3>
                            <p className="text-gray-600">
                                Agents run autonomously based on events in your CRM and other productivity tools
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6 text-gray-900">Testimonials</h2>
                        <p className="text-xl text-gray-600">Hear What Our Community Has to Say</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "This is the most powerful productivity tool I've used in the last decade. It allows us to achieve world-class alignment with our strategic priorities.",
                                author: "Sarah Johnson",
                                role: "Chief Executive Officer at TechCorp",
                                company: "TC"
                            },
                            {
                                quote: "Your tool gave me some critical insights and saves me a lot of time and effort to find a blueprint for what my team should be working on.",
                                author: "Mike Chen",
                                role: "Product Manager at InnovateLabs",
                                company: "IL"
                            },
                            {
                                quote: "The thing I need to do the most is be strategic and show that I know a lot about my team's priorities. It's much harder without ICE.",
                                author: "Lisa Rodriguez",
                                role: "Founder & CEO at StartupX",
                                company: "SX"
                            },
                            {
                                quote: "ICE is worth its weight in gold. The power of this tool is for our teams to be sitting around brainstorming and have instant priority clarity.",
                                author: "David Kim",
                                role: "Senior Director at MegaCorp",
                                company: "MC"
                            },
                            {
                                quote: "ICE is a game-changer for my team. We now know more about our priorities than ever before and have more time to focus on execution.",
                                author: "Emma Thompson",
                                role: "Head of Operations at ScaleUp",
                                company: "SU"
                            },
                            {
                                quote: "You have what 99% of the market don't have, most is vaporware, not real intelligence. We're finding 100% improvement in clarity.",
                                author: "James Wilson",
                                role: "Director of Strategy at Enterprise Inc",
                                company: "EI"
                            }
                        ].map((testimonial, index) => (
                            <MagicCard key={index} className="p-6 bg-white border-gray-200" gradientColor="#3b82f6">
                                <div className="space-y-4">
                                    <p className="text-gray-700 italic">&quot;{testimonial.quote}&quot;</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 font-bold text-sm">{testimonial.company}</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{testimonial.author}</div>
                                            <div className="text-sm text-gray-600">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </MagicCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6 text-gray-900">FAQs</h2>
                        <p className="text-xl text-gray-600">Frequently Asked Questions</p>
                    </div>

                    <div className="space-y-8">
                        {[
                            {
                                question: "Where does ICE get its information from?",
                                answer: "ICE analyzes your existing data, team inputs, market research, and historical performance to generate accurate Impact, Confidence, and Ease scores."
                            },
                            {
                                question: "How is my data protected?",
                                answer: "We use enterprise-grade security with SOC 2 Type II compliance, end-to-end encryption, and strict data privacy controls to protect your information."
                            },
                            {
                                question: "Does ICE offer plans for teams?",
                                answer: "Yes, we offer flexible team plans with collaborative features, shared workspaces, and admin controls for organizations of all sizes."
                            },
                            {
                                question: "Does ICE integrate with other productivity platforms?",
                                answer: "ICE integrates seamlessly with popular tools like Slack, Asana, Jira, Notion, and many other productivity and project management platforms."
                            },
                            {
                                question: "Can I use ICE to prioritize personal tasks?",
                                answer: "Absolutely! ICE works for both professional and personal task prioritization, helping you focus on what matters most in all areas of life."
                            },
                            {
                                question: "Something else is missing or isn't working?",
                                answer: "Our support team is here to help! Contact us through the chat widget or email support@ice.com for assistance with any issues."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 text-gray-900">
                        Get real results, not another tool
                    </h2>
                    <Link href="/auth/signup">
                        <RippleButton className="px-8 py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white mb-8">
                            Request a Custom Agent
                        </RippleButton>
                    </Link>
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="text-gray-600 mb-4">ICE Dashboard Preview</div>
                        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                            <div className="text-gray-500">Interactive Dashboard Coming Soon</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div className="md:col-span-2">
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                <AuroraText>ice</AuroraText>
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-md">
                                548 Market St, PMB 39241<br />
                                San Francisco, CA 94104
                            </p>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm text-gray-600">ICE is SOC 2 Type II compliant</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-gray-900">Platform</h4>
                            <div className="space-y-2">
                                <Link href="#methodology" className="block text-gray-600 hover:text-gray-900 transition-colors">ICE Methodology</Link>
                                <Link href="#how-it-works" className="block text-gray-600 hover:text-gray-900 transition-colors">How it works</Link>
                                <Link href="#templates" className="block text-gray-600 hover:text-gray-900 transition-colors">Templates</Link>
                                <Link href="/demo" className="block text-gray-600 hover:text-gray-900 transition-colors">Demo</Link>
                                <Link href="#pricing" className="block text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
                                <Link href="/auth/login" className="block text-gray-600 hover:text-gray-900 transition-colors">Log in</Link>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
                            <div className="space-y-2">
                                <Link href="/about" className="block text-gray-600 hover:text-gray-900 transition-colors">About</Link>
                                <Link href="/contact" className="block text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
                                <Link href="/privacy" className="block text-gray-600 hover:text-gray-900 transition-colors">Terms and conditions</Link>
                                <Link href="/privacy" className="block text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</Link>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
                        <p>Copyright © 2024 ice - AI-Powered Priority Management for Teams</p>
                    </div>
                </div>
            </footer>
        </div>
    )
} 