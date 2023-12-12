/**
 * 显示
 * @param id id
 * @param value  markdown值
 * @returns
 */
export const previewOnly = (id: string, value: any): any => {
  return new window.Cherry({
    id,
    value,
    /*
    externals: {
      echarts: window.echarts,
      katex: window.katex,
      MathJax: window.MathJax,
    },
    */
    engine: {
      syntax: {
        fontEmphasis: {
          allowWhitespace: true, // 是否允许首尾空格
        },
        /* ,
        mathBlock: {
          engine: 'MathJax', // katex或MathJax
          src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js', // 如果使用MathJax将js在此处引入，katex则需要将js提前引入
        },
        inlineMath: {
          engine: 'MathJax', // katex或MathJax
        },
        emoji: {
          useUnicode: false,
          customResourceURL: 'https://github.githubassets.com/images/icons/emoji/unicode/${code}.png?v8',
          upperCase: true,
        },
        // toc: {
        //     tocStyle: 'nested'
        // }
        // 'header': {
        //   strict: false
        // }
        */
      },
    },
    toolbars: {
      toolbar: false,
    },
    editor: {
      defaultModel: 'previewOnly',
    },
    /* ,
    callback: {
      onClickPreview: function(e) {
        const {target} = e;
        if(target.tagName === 'IMG') {
          console.log('click img', target);
          const tmp = new Viewer(target, {
              button: false,
              navbar: false,
              title: [1, (image, imageData) => `${image.alt.replace(/#.+$/, '')} (${imageData.naturalWidth} × ${imageData.naturalHeight})`],
              hidden(){
                tmp.destroy()
              },
            });
          tmp.show();
        }
      }
    }
    */
  });
};
