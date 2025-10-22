import React, { useState } from 'react';

interface CodeExampleProps {
  title: string;
  description: string;
  code: string;
  language?: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({ 
  title, 
  description, 
  code, 
  language = 'typescript' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="code-example">
      <div 
        className="code-example-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4>{title}</h4>
        <span className="code-example-toggle">
          {isExpanded ? '▼' : '▶'}
        </span>
      </div>
      <p className="code-example-description">{description}</p>
      {isExpanded && (
        <div className="code-example-content">
          <pre><code className={`language-${language}`}>{code}</code></pre>
        </div>
      )}
    </div>
  );
};

export default CodeExample;
