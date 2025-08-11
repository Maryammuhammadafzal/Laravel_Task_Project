import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AlertCircle, CheckCircle, Clock, List, Plus } from 'lucide-react';

interface Props {
    stats?: {
        totalLists: number;
        totalTasks: number;
        completedTasks: number;
        pendingTasks: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats = {
    totalLists: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
} }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background to-muted">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Welcome Back! Here's Your overview</p>
                    </div>
                    <div className='flex gap-2'>
                        <Link href={route('lists.index')}>
                            <Button><List className='h-4 w-4 mr-2' />View Lists</Button>
                        </Link>
                        <Link href={route('tasks.index')}>
                            <Button><List className='h-4 w-4 mr-2' />View Tasks</Button>
                        </Link>
                    </div>


                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Total Lists
                            </CardTitle>
                            <List className='h-4 w-4' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>{stats.totalLists}</div>
                            <p className='text-xs text-muted-foreground'>Your Task List</p>

                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Total Tasks
                            </CardTitle>
                            <CheckCircle className='h-4 w-4' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>{stats.totalTasks}</div>
                            <p className='text-xs text-muted-foreground'>All Your Task</p>

                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Pending Tasks
                            </CardTitle>
                            <Clock className='h-4 w-4' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>{stats.pendingTasks}</div>
                            <p className='text-xs text-muted-foreground'>Task to completed</p>

                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Completed Tasks
                            </CardTitle>
                            <AlertCircle className='h-4 w-4' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>{stats.completedTasks}</div>
                            <p className='text-xs text-muted-foreground'>Task DialogContent</p>
                        </CardContent>
                    </Card>
                </div>

                <div className='grid gap-4 md:grid-cols-2'>
                    <Card className='border border-primary/20'>
                        <CardHeader className='flex gap-2 flex-row items-center'>
                            <CardTitle className='text-lg'>
                                Quick Actions
                            </CardTitle>
                            <AlertCircle className='h-4 w-4' />
                        </CardHeader>
                        <CardContent>
                            <div className='grid gap-4'>
                                <Link href={route('lists.index')}>
                                    <Button variant='outline' className='w-full justify-start'>
                                        <List className='h-4 w-4 mr-2' />
                                        View All
                                    </Button>
                                </Link>
                                <Link href={route('tasks.index')}>
                                    <Button variant='outline' className='w-full justify-start'>
                                        <CheckCircle className='h-4 w-4 mr-2' />
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border border-primary/20'>
                        <CardHeader className='flex gap-2 flex-row items-center'>
                            <CardTitle className='text-lg'>
                                Recent Activity
                            </CardTitle>
                            <AlertCircle className='h-4 w-4' />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className='rounded-full bg-primary/10 p-2'>
                                        <Plus className='h-4 w-4 text-primary' />
                                    </div>

                                    <div className=''>
                                        <p className='text-sm font-medium'>Welcome to Task Manager</p>
                                        <p className='text-xs text-muted-foreground'>Get Started by creating your first List or Task</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
