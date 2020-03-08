# Design Guidelines for Job Triage
## CSS Guidelines
- Global CSS styles should be declared in the global style directory present at location ```/frontend/src/global-styles```.
- To declare global style, use only element type or HTML tag name as CSS selectors.
For example,
`a {
link-style : none
}`
- The CSS pattern that we are going forward with is **CSS-Modules + SCSS**.
CSS-Modules will help to avoid the global namespacing collision. And we can write the CSS class name per component more confidently. We can avoid the BEM naming convention with this approach which can make markup polluted with the long class name.
- SCSS's mixin and function will help to re-use the CSS styles in the project.
- We recommend using a flat class name as CSS selectors. Do not use id as CSS selectors.
- Don't use CSS selectors for Non-CSS functionality.  For Non-CSS functionality, use data attribute or id.
- Don't use !important as a CSS rule.
- We don't recommend the in-line style.

## Component Guidelines
- Don't use the Material-UI component directly in the component. Use at least one level of abstraction.
- Create a custom Material-UI component before use.