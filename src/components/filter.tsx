"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";


export default function Filter() {
    const searchParams = useSearchParams()
    const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
    const [gender, setGender] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<string | undefined>(undefined);
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleGenderChange = (e: string) => {
        if (e) {
            setGender(e);
            params.set("gender", e);
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const handleStatusChange = (e: string) => {
        if (e) {
            setStatus(e);
            params.set("status", e);
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const handleclearFilter = () => {
        setGender(undefined);
        setStatus(undefined);
        params.delete("gender");
        params.delete("status");
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className={`flex items-center p-2.5 w-max gap-4 rounded-lg h-12`}>
            <Select onValueChange={handleGenderChange} defaultValue={gender}>
                <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder="Select a gender" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem
                            value="female"
                            className='capitalize dark:text-white text-slate-900'
                        >
                            Female
                        </SelectItem>
                        <SelectItem
                            value="male"
                            className='capitalize dark:text-white text-slate-900'
                        >
                            Male
                        </SelectItem>
                        <SelectItem
                            value="unknown"
                            className='capitalize dark:text-white text-slate-900'
                        >
                            Unknown
                        </SelectItem>
                        <SelectItem
                            value="genderless"
                            className='capitalize dark:text-white text-slate-900'
                        >
                            Genderless
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select onValueChange={handleStatusChange} defaultValue={status}>
                <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem
                            value="alive"
                            className='capitalize dark:text-white text-slate-900'
                        >
                            Alive
                        </SelectItem>
                        <SelectItem
                            value="dead"
                            className='capitalize dark:text-white text-slate-900'
                        >
                            Dead
                        </SelectItem>
                        <SelectItem
                            value="unknown"
                            className='capitalize dark:text-white text-slate-900'
                        >
                            Unknown
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button onClick={handleclearFilter} className="text-sm text-white bg-red-500 rounded-md px-2.5 py-1.5">Clear Filter</Button>
        </div>
    )
}