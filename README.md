# react-translator
A translator component for use with react

This component is rendered as a parent of your component and passes a translate and getTranslations method to your component's props. It uses separate translation files for different pages and can be used as follows.

```javascript
ReactDOM.render(
    (
        <Translator page="main" lang="en">
            <Component />
        </Translator>
    ),
    document.getElementById('app')
);
```

the translations should be formatted like the json object below

```javascript
"translation-key":{
      "translation":"translation with @@var",
      "var_count":1,
      "vars":[  
         "@@var"
      ]
   }
```
