// components/Card.tsx

type CardProps = {
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
};

export const Card = ({ title, description, buttonText, onClick }: CardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm hover:scale-[1.02] transition">
      <h2 className="text-xl font-semibold text-indigo-700 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      {buttonText && (
        <button
          onClick={onClick}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

// component/card/page.tsx

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-gray-700">{children}</div>;
};

