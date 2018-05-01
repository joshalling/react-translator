# react-translator
A translator component for use with react

This component is rendered as a parent of your component and passes a translate and getTranslations method to your component's props. 

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
