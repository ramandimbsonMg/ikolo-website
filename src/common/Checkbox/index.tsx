import React from 'react';

const Checkbox = ({
  className,
  id,
  label,
  styledLabel,
  ...rest
}: {
  className?: string;
  id: string;
  styledLabel?: React.ReactNode;
} & React.HTMLProps<HTMLInputElement>) => {
  return (
    <div className={'flex items-center ' + className}>
      <input
        id={id}
        type='checkbox'
        value=''
        className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:[#002F72] focus:ring-2 text-left'
        {...rest}
      />
      {label && (
        <label htmlFor={id} className='ml-2 font-medium text-primary'>
          {label}
        </label>
      )}
      {styledLabel && <label htmlFor={id}>{styledLabel}</label>}
    </div>
  );
};

export default Checkbox;
