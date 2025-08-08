import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Dialog } from "@radix-ui/react-dialog";
import { CheckCircle2, Plus, XCircle } from "lucide-react";
import { useEffect, useState } from "react";


interface List {
    id: number;
    title: string;
    description: string;
    tasks_count?: number;
}

interface Props {
    lists: List[];
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lists',
        href: '/lists'
    },
];

export default function ListsIndex({ lists, flash }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingList, setEditingList] = useState<List | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
    }, [flash]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const { data, setData, post, put, processing, reset, delete: destroy } = useForm({
        title: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingList) {
            put(route('lists.update', editingList.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingList(null);
                }
            })
        } else {
            put(route('lists.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                }
            });
        }
    };

    const handleEdit = (list: List) => {
        setEditingList(list);
        setData({
            title: list.title,
            description: list.description || '',
        });
        setIsOpen(true);
    };

    const handleDelete = (listId: number) => {
        destroy(route('lists.destroy', listId));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lists" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {
                    showToast && (
                        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white animate-in fade-in slide-in-from-top-5`}>
                            {toastType === 'success' ? (
                                <CheckCircle2 className="h-5 w-5" />
                            ) :
                                (
                                    <XCircle className="h-5 w-5" />
                                )}
                            <span>{toastMessage}</span>
                        </div>
                    )
                }

                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Lists</h1>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                New List
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingList ? 'Edit List' : ' Create New List'}
                                </DialogTitle>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-2">
                               <div className="space-y-2">
                                 <Label htmlFor="title">Title</Label>
                                <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                               </div>
                               <div className="space-y-2">
                                 <Label htmlFor="description">Description</Label>
                                <Input id="description" value={data.description} onChange={(e) => setData('title', e.target.value)} required />
                               </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </AppLayout>
    )
}