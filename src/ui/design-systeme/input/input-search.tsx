import { IconProps } from "@/types/iconProps";
import clsx from "clsx";

interface Props {
    type: "search";
    className?: string;
    placeholder?: string;
    icon?: IconProps;
    required?: any;
}

export const InputSearch = ({
    type = "search",
    className,
    placeholder,
    icon
}: Props) => {
    return (
        <>
            <div className="relative h-full">
                <input type={type} name="query" placeholder={placeholder} className={clsx(className, "h-full w-60 rounded-full text-xs border py-2.5 pb-2.5 pr-10 pl-4 outline-none text-primary font-medium")} role="combobox" aria-controls="combobox-9213" aria-expanded="false" aria-autocomplete="list" aria-haspopup="listbox" />
                {
                    (icon ?
                        <>
                            <div className="absolute inset-y-0 right-0 m-px flex items-center px-3 bg-primary rounded-l rounded-full">
                                <button type="submit" className="items-center focus:outline-none flex text-white">
                                    <icon.icon className="w-6 h-6" />
                                </button>
                            </div>
                        </> : "")

                }
            </div>
        </>
    )

}