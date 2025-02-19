import Layout from '../../src/components/Layout';

const Playground: React.FC = () => {
  const codepenEmbedCode = `<iframe height="300" style="width: 100%;" scrolling="no" title="Svelte Demo - Markdown Editor" src="https://codepen.io/Chris-Stevens/embed/xbxGQYw?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
    See the Pen <a href="https://codepen.io/Chris-Stevens/pen/xbxGQYw">Svelte Demo - Markdown Editor</a> by Chris Stevens (<a href="https://codepen.io/Chris-Stevens">@Chris-Stevens</a>) on <a href="https://codepen.io">CodePen</a>.
  </iframe>`;

  const codepenEmbedCode2 = `<iframe height="300" style="width: 100%;" scrolling="no" title="Svelte Demo - Markdown Editor" src="https://codepen.io/Chris-Stevens/embed/xbxGQYw?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
    See the Pen <a href="https://codepen.io/Chris-Stevens/pen/xbxGQYw">Svelte Demo - Markdown Editor</a> by Chris Stevens (<a href="https://codepen.io/Chris-Stevens">@Chris-Stevens</a>) on <a href="https://codepen.io">CodePen</a>.
  </iframe>`;

  const codepenEmbedCode3 = `<iframe height="300" style="width: 100%;" scrolling="no" title="Svelte Demo - Markdown Editor" src="https://codepen.io/Chris-Stevens/embed/xbxGQYw?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
    See the Pen <a href="https://codepen.io/Chris-Stevens/pen/xbxGQYw">Svelte Demo - Markdown Editor</a> by Chris Stevens (<a href="https://codepen.io/Chris-Stevens">@Chris-Stevens</a>) on <a href="https://codepen.io">CodePen</a>.
  </iframe>`;

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Playground</h1>
          <p className="flex space-y-4">Welcome to the code playground area where I showcase snippets of code on <a href="https://codepen.io/">CodePen</a>.</p>
          </div>

          <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-12">Svelte Markdown Editor</h2>
            <div dangerouslySetInnerHTML={{ __html: codepenEmbedCode }} />
          </div>

          <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-12">Discord Web Hooks</h2>
            <div dangerouslySetInnerHTML={{ __html: codepenEmbedCode2 }} />
          </div>

          <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-12">Pure JS Square Metre Calculator</h2>
            <div dangerouslySetInnerHTML={{ __html: codepenEmbedCode3 }} />
          </div>
        </div>
      </div>
    </section>
  );
};


const PlaygroundPage: React.FC = () => (
  <Layout>
    <Playground />
  </Layout>
)

export default PlaygroundPage;