// src/components/DynamicAccordion.jsx
"use client";

export default function DynamicAccordion({ items }) {
  return (
    <div className='row mb-3'>
      <div className="accordion accordion-flush" id="dynamicAccordion">
        {items.map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded={index === 0 ? 'true' : 'false'}
                aria-controls={`collapse${index}`}
              >
                {item.title}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
              data-bs-parent="#dynamicAccordion"
            >
              <div className="accordion-body">
                {item.content} {/* Aqui o conteúdo é renderizado */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}