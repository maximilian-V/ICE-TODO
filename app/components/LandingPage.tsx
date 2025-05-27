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
import { cn } from '@/lib/utils'

// Elegant floating shape component for the hero section
function FloatingShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-[#bae6fd]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -50,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border border-[#e0f2fe]",
                        "shadow-[0_8px_32px_0_rgba(186,230,253,0.2)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

export function LandingPage() {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.2 + i * 0.15,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#e6f7fa] via-[#f4fbfd] to-[#eaf6fb] text-[#1e3a5f] relative overflow-hidden">
            {/* Enhanced Hero Section */}
            <section className="relative py-20 md:py-32 px-6 min-h-[90vh] flex items-center">
                <div className="absolute inset-0 overflow-hidden">
                    {/* Decorative floating shapes */}
                    <FloatingShape
                        delay={0.3}
                        width={600}
                        height={140}
                        rotate={12}
                        gradient="from-[#7dd3fc]/30"
                        className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                    />

                    <FloatingShape
                        delay={0.5}
                        width={500}
                        height={120}
                        rotate={-15}
                        gradient="from-[#e0f2fe]/40"
                        className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                    />

                    <FloatingShape
                        delay={0.4}
                        width={300}
                        height={80}
                        rotate={-8}
                        gradient="from-[#bae6fd]/30"
                        className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                    />

                    <FloatingShape
                        delay={0.6}
                        width={200}
                        height={60}
                        rotate={20}
                        gradient="from-[#0c4a6e]/10"
                        className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                    />

                    <FloatingShape
                        delay={0.7}
                        width={150}
                        height={40}
                        rotate={-25}
                        gradient="from-[#7dd3fc]/20"
                        className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            custom={0}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex justify-center"
                        >
                            <Badge variant="outline" className="animate-appear gap-2 mb-6 bg-[#e0f2fe] text-[#0c4a6e] border-[#bae6fd] px-4 py-1.5">
                                <span className="text-[#0c4a6e]">Introducing ICE Framework</span>
                                <Link href="/demo" className="flex items-center gap-1 text-[#0c4a6e] hover:text-[#0a3a5a]">
                                    See it in action
                                    <ChevronRight className="h-3 w-3" />
                                </Link>
                            </Badge>
                        </motion.div>

                        <motion.div
                            custom={1}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0c4a6e] via-[#0a3a5a] to-[#0c4a6e]">
                                    Smart Task Prioritization
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div
                            custom={2}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                                with the
                                <span className="bg-gradient-to-r from-[#0c4a6e] via-[#0a3a5a] to-[#0c4a6e] bg-clip-text text-transparent">
                                    {" "}ICE Framework
                                </span>
                            </h2>
                        </motion.div>

                        <motion.div
                            custom={3}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <p className="text-md md:text-xl font-medium text-[#1e3a5f] max-w-2xl mx-auto mb-12">
                                Organize your tasks using Impact, Confidence, and Ease scoring.
                                Drag & drop kanban board with intelligent prioritization.
                            </p>
                        </motion.div>

                        <motion.div
                            custom={4}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex justify-center gap-4"
                        >
                            <Button size="lg" asChild className="bg-[#0c4a6e] hover:bg-[#0a3a5a] text-white">
                                <Link href="/demo" className="flex items-center gap-2">
                                    Try Demo
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild className="border-[#bae6fd] text-[#0c4a6e] hover:bg-[#e0f2fe]">
                                <Link href="/auth/signup" className="flex items-center gap-2">
                                    Sign Up Free
                                </Link>
                            </Button>
                        </motion.div>

                        {/* App Preview with animation */}
                        <motion.div
                            custom={5}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="relative pt-16 flex justify-center"
                        >
                            <div className="relative">
                                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#7dd3fc]/30 to-[#e0f2fe]/30 rounded-xl blur-md"></div>
                                <Image
                                    src="/app-preview.png"
                                    alt="ICE Todo App Preview"
                                    width={700}
                                    height={400}
                                    priority
                                    className="rounded-xl shadow-lg bg-[#e0f2fe] border border-[#bae6fd] relative z-10"
                                />

                                {/* Floating ICE indicators */}
                                <motion.div
                                    className="absolute -top-6 -right-6 bg-[#0c4a6e] text-white rounded-full px-4 py-2 font-bold shadow-lg z-20"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2.2, duration: 0.8 }}
                                >
                                    Impact
                                </motion.div>
                                <motion.div
                                    className="absolute -bottom-6 -right-6 bg-[#7dd3fc] text-[#0c4a6e] rounded-full px-4 py-2 font-bold shadow-lg z-20"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2.4, duration: 0.8 }}
                                >
                                    Confidence
                                </motion.div>
                                <motion.div
                                    className="absolute -bottom-6 -left-6 bg-[#e0f2fe] text-[#0c4a6e] rounded-full px-4 py-2 font-bold shadow-lg z-20"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2.6, duration: 0.8 }}
                                >
                                    Ease
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
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