import React from 'react';

interface Props {
    value: string;
    onChange: (value: string) => void;
    inputRef?: React.RefObject<HTMLInputElement | null>;
}

const SearchBar = ({ value, onChange, inputRef }: Props) => {
    return (
        <div className="w-full">
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search tasks by ID, title, or assignee..."
                className="w-full px-3 py-2 bg-vscode-input-background text-vscode-input-foreground border border-vscode-input-border rounded focus:outline-none focus:border-vscode-focusBorder"
            />
        </div>
    );
};

export default SearchBar;
