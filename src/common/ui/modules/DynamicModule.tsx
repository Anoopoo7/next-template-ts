'use client';

import { FC, useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

interface DynamicModuleProps {
  projectData: string;
}

const DynamicModuleView: FC<DynamicModuleProps> = ({ projectData }) => {
  const [html, setHtml] = useState<string>('');
  const [css, setCss] = useState<string>('');

  const editor = grapesjs.init({
    container: document.createElement('div'),
    storageManager: false,
  });

  function scopeCss(css: string, scope: string = '.module-scope') {
    return css.replace(/(^|\})\s*([^{\}@]+)/g, (match, brace, selector) => {
      if (selector.startsWith('@')) return match;
      const scopedSelector = selector
        .split(',')
        .map((s: string) => `${scope} ${s.trim()}`)
        .join(', ');
      return `${brace} ${scopedSelector}`;
    });
  }

  useEffect(() => {
    editor.loadProjectData(projectData ? JSON.parse(projectData) : {});
    setHtml(editor.getHtml());
    setCss(scopeCss(editor.getCss() || ''));
  }, [editor, projectData]);

  return (
    <>
      {projectData && (
        <div className='module-scope'>
          <style>{css}</style>
          <link
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
          />
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}
    </>
  );
};

export default DynamicModuleView;
