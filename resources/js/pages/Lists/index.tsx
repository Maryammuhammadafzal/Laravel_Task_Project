import { BreadcrumbItem } from "@/types";
import { useForm } from "@inertiajs/react";
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
            })
        }
    }
}