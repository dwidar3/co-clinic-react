import React from 'react';
import { Button } from '@mui/material';

export default function InfoCard({
  title,
  icon,
  description,
  highlights = [],
  button,
}: {
  title: string;
  icon: React.ReactElement; // 🔄 Changed to React.ReactElement
  description: string;
  highlights?: { icon: React.ReactElement; text: string }[]; // 🔄 Same here
  button?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
}) {
  return (
    <div className="p-6 rounded-lg transform hover:scale-102 transition-transform duration-100">
      <div className="flex items-center mb-4">
        {React.cloneElement(icon, { style: { fontSize: 32, color: '#145253' } })}
        <h2 className="text-2xl font-bold ml-2 text-gray-900">{title}</h2>
      </div>
      <p className="mt-2 text-gray-700">{description}</p>
      {highlights.map((item, idx) => (
        <div className="flex items-center mt-4" key={idx}>
          {React.cloneElement(item.icon, { style: { fontSize: 24, color: '#145253' } })}
          <p className="ml-2 text-gray-600">{item.text}</p>
        </div>
      ))}
      {button && (
        <Button
          variant="contained"
          color="primary"
          className="!bg-[#145253] mt-4 w-full"
          href={button.href}
          onClick={button.onClick}
        >
          {button.text}
        </Button>
      )}
    </div>
  );
}
