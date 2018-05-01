import React from 'react';

export class Translator extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            blocks: {}
        };

        this.translate = this.translate.bind(this);
        this.getTranslations = this.get_translation_page.bind(this);
        this.getTranslations(this.props.lang, this.props.url);
    }

    getTranslations(lang, url) {
        let self = this;
        let url = url;
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin'

        })
            .then(res =>
            {
                if (!res.ok) {
                    throw res;
                }
                return res.json()
            })
            .then(json =>
            {
                self.setState({blocks: json});
            })
            .catch(error =>
            {
                display_message(error.statusText, true);
            });
    }

    static translationGenerate(block, vars) {
        let translation;
        if (block['vars_count'] === 0) {
            translation = block['translation'];
        } else {
            for (let i = 0; i < block['vars'].length; i++) {
                block['translation'] = block['translation'].replace(block['vars'][i], vars[block['vars'][i]]);
            }
            translation = block['translation'];
        }

        return translation;
    }

    translate(key, vars)
    {
        let blocks = this.state.blocks;
        let blocks_en = this.state.blocks_en;
        let translation;
        if (key in blocks) {
            translation = Translator.translationGenerate(blocks[key], vars);
        }

        return translation;
    }

    render()
    {
        let childWithProp = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {translate: this.translate, getTranslations: this.getTranslations});
        });

        return (
            <div className="translator">
                {childWithProp}
            </div>
        )
    }
}
