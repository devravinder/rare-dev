import { useState } from 'react';
import { Editor } from './components/Editor';
import Preview from './components/Preview';
import { Card, CardContent } from './components/Card';

function App() {

  const [content, setContent] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Rich Text Editor
        </h1>
        <Card>
          <CardContent>
            <Editor onBlur={setContent} />
          </CardContent>
        </Card>

        <h1>Preview</h1>

        <hr />
        <Card>
          <CardContent>
            <Preview content={content} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;