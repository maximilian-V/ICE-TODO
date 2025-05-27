'use client'

import Link from 'next/link'
import {
    Zap,
    CheckCircle,
    TrendingUp,
    Target,
    BarChart3,
    Move,
    Users,
    ArrowRight,
    Star,
    Clock,
    Sparkles,
    ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { BlurFade } from '@/components/magicui/blur-fade'
import { motion } from 'framer-motion'

export function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#e6f7fa] via-[#f4fbfd] to-[#eaf6fb] text-[#1e3a5f] relative overflow-hidden">
            {/* Enhanced Hero Section with Lamp Effect */}
            <section className="relative z-0 flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#e6f7fa] via-[#f4fbfd] to-[#eaf6fb]">
                {/* Gradient Lamp Effect */}
                <div className="absolute top-0 isolate z-0 flex w-screen flex-1 items-start justify-center">
                    {/* Blur overlay */}
                    <div className="absolute top-0 z-50 h-48 w-screen bg-transparent opacity-10 backdrop-blur-md" />

                    {/* Main glow */}
                    <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[-30%] rounded-full bg-[#7dd3fc]/60 opacity-80 blur-3xl" />

                    {/* Lamp effect */}
                    <motion.div
                        initial={{ width: "8rem" }}
                        viewport={{ once: true }}
                        transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
                        whileInView={{ width: "16rem" }}
                        className="absolute top-0 z-30 h-36 -translate-y-[20%] rounded-full bg-[#bae6fd]/60 blur-2xl"
                    />

                    {/* Top line */}
                    <motion.div
                        initial={{ width: "15rem" }}
                        viewport={{ once: true }}
                        transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
                        whileInView={{ width: "30rem" }}
                        className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-[#0c4a6e]/60"
                    />

                    {/* Left gradient cone */}
                    <motion.div
                        initial={{ opacity: 0.5, width: "15rem" }}
                        whileInView={{ opacity: 1, width: "30rem" }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-[#7dd3fc]/60 via-transparent to-transparent"
                        style={{
                            backgroundImage: `conic-gradient(from 70deg at center top, #7dd3fc60, transparent, transparent)`,
                        }}
                    >
                        <div className="absolute w-[100%] left-0 bg-gradient-to-b from-[#e6f7fa] to-[#f4fbfd] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                        <div className="absolute w-40 h-[100%] left-0 bg-gradient-to-r from-[#e6f7fa] to-transparent bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
                    </motion.div>

                    {/* Right gradient cone */}
                    <motion.div
                        initial={{ opacity: 0.5, width: "15rem" }}
                        whileInView={{ opacity: 1, width: "30rem" }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-[#7dd3fc]/60"
                        style={{
                            backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, #7dd3fc60)`,
                        }}
                    >
                        <div className="absolute w-40 h-[100%] right-0 bg-gradient-to-l from-[#e6f7fa] to-transparent bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                        <div className="absolute w-[100%] right-0 bg-gradient-to-b from-[#e6f7fa] to-[#f4fbfd] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                    </motion.div>
                </div>

                {/* Content */}
                <motion.div
                    initial={{ y: 100, opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="relative z-50 container flex justify-center flex-1 flex-col px-5 md:px-10 gap-4 -translate-y-20"
                >
                    <div className="flex flex-col items-center text-center space-y-6">
                        {/* Badge */}
                        <Badge variant="outline" className="gap-2 bg-[#e0f2fe]/80 text-[#0c4a6e] border-[#bae6fd] px-4 py-1.5">
                            <span className="text-[#0c4a6e]">Introducing ICE Framework</span>
                            <Link href="/demo" className="flex items-center gap-1 text-[#0c4a6e] hover:text-[#0a3a5a]">
                                See it in action
                                <ChevronRight className="h-3 w-3" />
                            </Link>
                        </Badge>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-[#0c4a6e] via-[#0a3a5a] to-[#0c4a6e] bg-clip-text text-transparent">
                            Smart Task Prioritization
                        </h1>

                        {/* Subtitle */}
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#1e3a5f]">
                            with the
                            <span className="bg-gradient-to-r from-[#0c4a6e] via-[#0a3a5a] to-[#0c4a6e] bg-clip-text text-transparent">
                                {" "}ICE Framework
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-[#1e3a5f] max-w-[600px] leading-relaxed">
                            Organize your tasks using Impact, Confidence, and Ease scoring.
                            Drag & drop kanban board with intelligent prioritization.
                        </p>

                        {/* Actions */}
                        <div className="flex gap-4 mt-8">
                            <Button size="lg" asChild className="bg-[#0c4a6e] hover:bg-[#0a3a5a] text-white">
                                <Link href="/demo" className="flex items-center gap-2">
                                    Try Demo
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild className="border-[#bae6fd] text-[#0c4a6e] hover:bg-[#e0f2fe]">
                                <Link href="/auth/signup" className="flex items-center gap-2">
                                    Sign Up Free
                                </Link>
                            </Button>
                        </div>

                        {/* App Preview */}
                        <div className="relative pt-12 max-w-4xl">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-gradient-to-r from-[#7dd3fc]/30 to-[#e0f2fe]/30 rounded-xl blur-lg"></div>
                                <div className="relative bg-[#e0f2fe]/20 rounded-xl p-2 border border-[#bae6fd]/50">
                                    <Image
                                        src="/board.png"
                                        alt="ICE Todo App Preview"
                                        width={800}
                                        height={500}
                                        priority
                                        className="rounded-lg shadow-2xl bg-white border border-[#bae6fd] relative z-10"
                                    />
                                </div>

                                {/* Floating ICE indicators */}
                                <motion.div
                                    className="absolute -top-4 -right-4 bg-[#0c4a6e] text-white rounded-full px-4 py-2 font-bold shadow-lg z-20 text-sm"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2, duration: 0.8 }}
                                >
                                    Impact
                                </motion.div>
                                <motion.div
                                    className="absolute -bottom-4 -right-4 bg-[#7dd3fc] text-[#0c4a6e] rounded-full px-4 py-2 font-bold shadow-lg z-20 text-sm"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.4, duration: 0.8 }}
                                >
                                    Confidence
                                </motion.div>
                                <motion.div
                                    className="absolute -bottom-4 -left-4 bg-[#e0f2fe] text-[#0c4a6e] rounded-full px-4 py-2 font-bold shadow-lg z-20 text-sm"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.6, duration: 0.8 }}
                                >
                                    Ease
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-[#e0f2fe]/60 to-[#f4fbfd]/80 relative">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <BlurFade delay={0.5} inView>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1e3a5f]">
                                Everything you need for smart task management
                            </h2>
                        </BlurFade>
                        <BlurFade delay={0.6} inView>
                            <p className="text-xl text-[#0c4a6e] max-w-3xl mx-auto">
                                Built with the ICE methodology to help you focus on what matters most
                            </p>
                        </BlurFade>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <BarChart3 className="w-6 h-6 text-[#0c4a6e]" />,
                                title: "ICE Scoring",
                                description: "Rate tasks by Impact (1-10), Confidence (1-10), and Ease (1-10). Automatic calculation of ICE scores for smart prioritization.",
                                color: "from-[#bae6fd] to-[#7dd3fc]"
                            },
                            {
                                icon: <Move className="w-6 h-6 text-[#0c4a6e]" />,
                                title: "Drag & Drop Kanban",
                                description: "Intuitive kanban board with three columns: To Do, In Progress, and Done. Drag tasks to reorder and move between columns.",
                                color: "from-[#e0f2fe] to-[#7dd3fc]"
                            },
                            {
                                icon: <CheckCircle className="w-6 h-6 text-[#0c4a6e]" />,
                                title: "Subtasks",
                                description: "Break down complex tasks into manageable subtasks. Track progress with completion percentages and visual indicators.",
                                color: "from-[#bae6fd] to-[#e0f2fe]"
                            },
                            {
                                icon: <Target className="w-6 h-6 text-[#0c4a6e]" />,
                                title: "Smart Ordering",
                                description: "Tasks are automatically ordered by ICE score within each column. Focus on high-impact, high-confidence, easy-to-complete tasks first.",
                                color: "from-[#e0f2fe] to-[#bae6fd]"
                            },
                            {
                                icon: <Users className="w-6 h-6 text-[#0c4a6e]" />,
                                title: "Personal Workspace",
                                description: "Secure user authentication with personal task management. Your tasks are private and accessible only to you.",
                                color: "from-[#7dd3fc] to-[#e0f2fe]"
                            },
                            {
                                icon: <Clock className="w-6 h-6 text-[#0c4a6e]" />,
                                title: "Real-time Updates",
                                description: "Changes are saved instantly to the cloud. Your task order and progress persist across sessions.",
                                color: "from-[#e0f2fe] to-[#bae6fd]"
                            }
                        ].map((feature, index) => (
                            <BlurFade key={index} delay={0.7 + index * 0.1} inView>
                                <div
                                    className="group relative overflow-hidden rounded-xl border border-[#bae6fd] bg-white/80 p-8 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                                        <div className="from-[#e0f2fe]/40 to-transparent absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100"></div>
                                    </div>

                                    <div className="w-12 h-12 bg-[#e0f2fe] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>

                                    <h3 className="text-xl font-bold mb-4 text-[#1e3a5f]">{feature.title}</h3>

                                    <p className="text-[#1e3a5f]">
                                        {feature.description}
                                    </p>
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            {/* ICE Methodology Section */}
            <section className="py-20 px-6 bg-gradient-to-b from-[#f4fbfd] to-[#e0f2fe] relative">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <BlurFade delay={1.3} inView>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1e3a5f]">
                                The ICE Framework Explained
                            </h2>
                        </BlurFade>
                        <BlurFade delay={1.4} inView>
                            <p className="text-xl text-[#0c4a6e] max-w-3xl mx-auto">
                                A proven methodology for prioritizing tasks and features
                            </p>
                        </BlurFade>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {[
                            {
                                icon: <TrendingUp className="w-10 h-10 text-white" />,
                                title: "Impact",
                                description: "How much will this task move the needle? Rate from 1-10 based on the potential positive outcome and importance to your goals.",
                                color: "from-[#7dd3fc] to-[#bae6fd]"
                            },
                            {
                                icon: <Star className="w-10 h-10 text-white" />,
                                title: "Confidence",
                                description: "How sure are you that this task will achieve its intended impact? Rate your confidence level from 1-10.",
                                color: "from-[#bae6fd] to-[#e0f2fe]"
                            },
                            {
                                icon: <Zap className="w-10 h-10 text-white" />,
                                title: "Ease",
                                description: "How easy is this task to implement? Consider time, resources, and complexity. Rate from 1-10 (10 being very easy).",
                                color: "from-[#e0f2fe] to-[#7dd3fc]"
                            }
                        ].map((item, index) => (
                            <BlurFade key={index} delay={1.5 + index * 0.1} inView>
                                <div className="text-center group">
                                    <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-[#1e3a5f]">{item.title}</h3>
                                    <p className="text-[#1e3a5f] text-lg">
                                        {item.description}
                                    </p>
                                </div>
                            </BlurFade>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <BlurFade delay={1.8} inView>
                            <div className="bg-white/80 rounded-2xl p-8 max-w-2xl mx-auto border border-[#bae6fd]">
                                <h4 className="text-xl font-bold mb-4 text-[#1e3a5f]">ICE Score Calculation</h4>
                                <p className="text-lg text-[#0c4a6e] mb-4">
                                    <span className="font-mono bg-[#e0f2fe] px-3 py-1 rounded">
                                        ICE Score = Impact × Confidence × Ease
                                    </span>
                                </p>
                                <p className="text-[#1e3a5f]">
                                    Higher scores indicate tasks that should be prioritized first.
                                    Focus on tasks with high impact, high confidence, and high ease.
                                </p>
                            </div>
                        </BlurFade>
                    </div>
                </div>
            </section>

            {/* Demo Preview Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-[#e0f2fe]/60 to-[#f4fbfd]/80 relative">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <BlurFade delay={2.1} inView>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1e3a5f]">
                                See ICE Todo in Action
                            </h2>
                        </BlurFade>
                        <BlurFade delay={2.2} inView>
                            <p className="text-xl text-[#0c4a6e] max-w-3xl mx-auto">
                                Try our interactive demo to experience the power of ICE-based task prioritization
                            </p>
                        </BlurFade>
                    </div>

                    <BlurFade delay={2.3} inView>
                        <div className="bg-white/80 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto border border-[#bae6fd]">
                            <div className="bg-gradient-to-br from-[#e0f2fe]/40 to-[#f4fbfd]/60 rounded-lg h-96 flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#bae6fd]/20 to-[#7dd3fc]/10"></div>
                                <div className="relative z-10 text-center">
                                    <div className="w-16 h-16 bg-[#e0f2fe] rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Sparkles className="w-8 h-8 text-[#0c4a6e]" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">Interactive Kanban Board</h3>
                                    <p className="text-[#1e3a5f] mb-8 max-w-md">
                                        Drag and drop tasks, see ICE scores in action, and experience
                                        smart task prioritization firsthand.
                                    </p>
                                    <Button size="lg" asChild className="bg-[#0c4a6e] hover:bg-[#0a3a5a] text-white">
                                        <Link href="/demo" className="flex items-center gap-2">
                                            Launch Demo
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-b from-[#e6f7fa] to-[#f4fbfd] relative">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <BlurFade delay={2.5} inView>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1e3a5f]">
                            Ready to prioritize like a pro?
                        </h2>
                    </BlurFade>
                    <BlurFade delay={2.6} inView>
                        <p className="text-xl text-[#0c4a6e] mb-12">
                            Join thousands of users who have transformed their productivity with ICE Todo
                        </p>
                    </BlurFade>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild className="bg-[#0c4a6e] hover:bg-[#0a3a5a] text-white">
                            <Link href="/auth/signup" className="flex items-center gap-2">
                                Start Free Today
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild className="border-[#bae6fd] text-[#0c4a6e] hover:bg-[#e0f2fe]">
                            <Link href="/demo" className="flex items-center gap-2">
                                Try Demo First
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#bae6fd] py-16 px-6 bg-gradient-to-b from-[#e0f2fe]/60 to-[#f4fbfd]/80 relative">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div>
                            <BlurFade delay={2.9} inView>
                                <h3 className="text-2xl font-bold mb-4 text-[#1e3a5f]">
                                    <span className="bg-gradient-to-r from-[#7dd3fc] via-[#bae6fd] to-[#e0f2fe] bg-clip-text text-transparent">
                                        ICE Todo
                                    </span>
                                </h3>
                            </BlurFade>
                            <BlurFade delay={3.0} inView>
                                <p className="text-[#1e3a5f] mb-6">
                                    Smart task prioritization using the proven ICE framework.
                                    Focus on what matters most.
                                </p>
                            </BlurFade>
                        </div>

                        <div>
                            <BlurFade delay={3.1} inView>
                                <h4 className="font-semibold mb-4 text-[#1e3a5f]">Product</h4>
                            </BlurFade>
                            <BlurFade delay={3.2} inView>
                                <div className="space-y-2">
                                    <Link href="/demo" className="block text-[#0c4a6e] hover:text-[#0a3a5a] transition-colors">Demo</Link>
                                    <Link href="/auth/signup" className="block text-[#0c4a6e] hover:text-[#0a3a5a] transition-colors">Sign Up</Link>
                                    <Link href="/auth/login" className="block text-[#0c4a6e] hover:text-[#0a3a5a] transition-colors">Log In</Link>
                                </div>
                            </BlurFade>
                        </div>

                        <div>
                            <BlurFade delay={3.3} inView>
                                <h4 className="font-semibold mb-4 text-[#1e3a5f]">Company</h4>
                            </BlurFade>
                            <BlurFade delay={3.4} inView>
                                <div className="space-y-2">
                                    <Link href="/about" className="block text-[#0c4a6e] hover:text-[#0a3a5a] transition-colors">About</Link>
                                    <Link href="/contact" className="block text-[#0c4a6e] hover:text-[#0a3a5a] transition-colors">Contact</Link>
                                    <Link href="/privacy" className="block text-[#0c4a6e] hover:text-[#0a3a5a] transition-colors">Privacy Policy</Link>
                                </div>
                            </BlurFade>
                        </div>
                    </div>

                    <BlurFade delay={3.5} inView>
                        <div className="border-t border-[#bae6fd] pt-8 text-center text-[#0c4a6e]">
                            <p>© {new Date().getFullYear()} ICE Todo - Smart Task Prioritization Made Simple</p>
                        </div>
                    </BlurFade>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage 