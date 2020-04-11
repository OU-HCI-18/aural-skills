# How to: React

## High-Level Idea

Instead of writing JavaScript inside of some HTML, you're writing HTML inside of JavaScript.
    Yay!
React basically allows you to define what you want to application to look like at any
(and every) snapshot in time, then takes care of managing the transitions.

## In Some Detail

Let's start by looking at some React code, to get a sense of how we're getting to the HTML
on the screen.

In the App class (in App.js), in the render() function, I define what the app should
look like. This is the entry point for react, so this render() function is basically
the first code that is run (technically the constructor for App is run first, but this
is the code that's actually displaying things).

Inside of the return() statement is the actual HTML for the application.
You'll notice that there isn't actually a lot of code here--in fact, most of what I'm
doing is showing the header (`<h1>Aural Training</h1>`), then setting up a few magic
components (`<BrowserRouter><Switch><Route>`). These are a little complicated, but
 the basic explanation is that the `<Switch>` will display exactly one of the
`<Route>`'s defined inside of it at a time, depending on the current URL path.

In other words, it works like this:

```JavaScript
switch (relative_url) {
    case "settings" :
        <Settings />
    case "/train" :
        <TrainView />
    default:
        <PlayView />
}
```

Here, `<Settings/>`, `<TrainView/>`, and `<PlayView/>` are *React Components* that I've defined.
Like other HTML components, we can pass arguments (properties) to them, just via a space-
seperated list. This works identically to HTML, with a few caveats.

* Aside:    The caveat is that if you're passing an argument to a pure HTML component,
            like `<button>`, the naming scheme changes a little bit for actions,
            because React takes care of those for us, so onclick becomes onClick).

This also allows us to pass in JavaScript, either as values (eg {this.state.duration}),
or as function pointers (eg {this.swapUI}). Note that if we're passing in JavaScript, we
need to wrap the code in curly braces {}.

### React Components: An Example

Time for another example. Let's say you want to make a webapp with one button, that, when
we click it, fires off some very complicated custom JavaScript. In React, we can do this:

```JavaScript
import React from 'react';
import './App.css';

function FancyButton (props) {
    return (
        <button className="big-button" onClick={props.passedFunction}>Press Me!</button>
    );
}
function App (props) {
    return (
        <FancyButton passedFunction={complicatedFunctionInScope} />
    );
}
export default App;
```

Let's break this down:

First, we're using React, so we need to import it: `import React from 'react';`

```JavaScript
function App (props) {
    ...
}
export default App;
```

This defines the entry point for the application (technically, a bit more is needed, but we don't
care about that because when you create a React app using `npm create-react-app`, it does that
bit for you).

In JavaScript, functions and classes are private to the file they are defined in, by default,
so we add the `export default App;` to export the `App` function. This way, if you add
`import App.js` at the top of some other file, it will import the `App` class.

* Aside: You can export multiple classes or functions via `export { App, Class1, Function1, Class2, ... }`
    and import them by adding `import { Class1, Function1 } from File.js`. Note that only the
    listed components will be imported, even if more than that are exported. To import all, do
    `import * from File.js`.

`function App (props) {` is the function definition for a React Component. If you see that, it's
(somewhat) of a guarantee that this function will return some JSX (in other words:
JavaScript-flavored HTML). Let's look at that further.

```JavaScript
return (
    <FancyButton passedFunction={complicatedFunctionInScope} />
);
```

Here, we return a component, FancyButton. It starts with an uppercase letter, which tells React
to look for a React Component called FancyButton (if it was a lowercase letter, it would look
for a pure HTML component). We're passing in an argument: `passedFunction={complicatedFunctionInScope}`.
We'll look at this in more detail later, but note that there are no restrictions or checking
on what you pass in - we could pass in additonal arguments that the component doesn't need
(they'll just be discarded), or we could fail to pass in an argument the component does need
(weird runtime errors usually happen here).

Okay, let's look at FancyButton now:

```JavaScript
function FancyButton (props) {
    return (
        <button className="big-button" onClick={props.passedFunction}>Press Me!</button>
    );
}
```

This is another React Component. It returns a pure HTML button. Let's go through that.

`<button ...>...</button>` defines the button. Simple enough.

`className="big-button"` defines the css class that this button will use. This needs to be
found by React, so at the top of the file we need to add `import './App.css'`, and in that file,
we'll need to add the line `.big-button{...}`. This is just an example of how we can define
styling, not a guide on styling, so we'll leave it at that for now.

`onClick={props.passedFunction}` is where the magic happens. Here, onClick is an argument to
button, which React will basically manage for us. When we click the button, React will call
the `onClick` method for that button. Here, we assign `onClick` to `props.passedFunction`,
which in turn points to `complicatedFunctionInScope`, so we're calling the function that we want
to.

`Press Me!` is just the text of the button.

Okay! Now we're getting somewhere.

One last thing, before moving on to classes:

Let's say you want to pass an argument to `complicatedFunctionInScope`. In order to do this, we
need to use a lambda function (basically, an anonymous function). The easiest way to do this is:

```JavaScript
<button onClick={(e) => props.function(props.param_1, const_param2, ....)}/>
```

This is equivalent to:

```JavaScript
<button onClick={function(e) { props.function(props.param_1, const_param2, ....) }}/>
```

So, for example, we could do:

```JavaScript
function FancyButton (props) {
    return (
        <button
            className="big-button"
            onClick={(e) => props.passedFunction(props.user_name, "Hello")}
        >
            Press Me!
        </button>
    );
}
```

If we wanted to pass in the parameter `props.user_name` (which would be passed in to FancyButton),
and the string "Hello".

* Aside:  e is a synthetic event. I don't really understand it, but basically it tells you stuff
            about how / when the button was click (the click event). It's the default parameter to
            onClick, but will be ignored by any function you pass as a pointer that doesn't require it.

### React Components: Classes, Functions, and Hooks

Time for the complicated stuff: `state` and `props`.

You'll notice that I somewhat skirted around what `props` *is*. To JavaScript, it's just an arbitrary object - it can be literally anything. But to React, it's something more important: it's the set of objects that the React component depends upon. **-Importantly**, _if something changes in `props`, React will re-render the component._ The same goes for `state`.

Again: if something changes in a component's `props` or `state`, React will re-render the component.

This means that if you have something you want to show the value of, it should be inside of the component's `props` or `state`.

Okay, but what is a `props`? What is a `state`?

### State

The `state` is easier to understand, so let's start there. A `state` is the state of a React **class** component. (functions do not have a state). **Classes** can also have `props`.

Okay, but what is a React class? The basic syntax looks like this:

```JavaScript
class Component extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <h1>A react class!</h1>
        );
    }
}
```

This should look familiar to the functions that we looked at earlier, so I'm not going to go into
a ton of detail here. Note that because this is a class, we need to use the `constructor(props)` to
pass in any arguments, instead of the more direct  `function Component(props)`.

Because this is a class, we can maintain a state, like this:

```JavaScript
constructor(props) {
    super(props);
    this.state = {
        key1 : value1,
        key2 : value2
    };
}
```

The `state` is special. If we want to change it later, we need to call the built-in React function
`setState`, like this:

```JavaScript
this.setState({key : value});
```

This will **merge** the new `{key : value}` into the state component. **DO NOT** try to set the state by directly assigning it, ie `this.state = {key : value}`. This will mess everything up.

Okay, enough about that. Why should I use `state` instead of `props`?

### Props

`props` are **read-only** objects. It's controlled by the component that passed-in the `props`.
This means that attempting to set a variable via setting `props.var` is a mistake. To store a new
value, we need to (either) set the `state`, or call a function that sets the `state`.

### Example

Okay, let's use what we know to make a small react component: a button and a label.
(we could obviously do this simpler, but meh).

```JavaScript
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label : "off"
        }
    }
    render() {
        return (
        <div>
            <h1>{this.state.label}</h1>
            <button onClick={this.setState({label : "on"})}>
                Click Me!
            </button>
        </div>
        );
    }
}
```

Note that React components need to return **one** element, so we have to wrap everything in a `<div>`.

Okay, looks good. But what if we want to turn the label "off"?

```JavaScript
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label : "off"
        }
    }
    render() {
        return (
        <div>
            <h1>{this.state.label}</h1>
            <button onClick={
                if (this.state.label === "off") {
                    this.setState({label : "on"});
                }
                else {
                    this.setState({label : "off"});
                }
            } >
                Click Me!
            </button>
        </div>
        );
    }
}
```

Hm, the button is starting to get complicated... let's slap that into a function:

```JavaScript
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label : "off"
        }
        this.updateLabel = this.updateLabel.bind(this);
    }
    updateLabel() {
        if (this.state.label === "off") {
            this.setState({label : "on"});
        }
        else {
            this.setState({label : "off"});
        }
    }
    render() {
        return (
            <div>
                <h1>{this.state.label}</h1>
                <button onClick={this.updateLabel}>
                    Click Me!
                </button>
            </div>
        );
    }
}
```

Wait, what! Where'd that `this.updateLabel = this.updateLabel.bind(this);` come from?

JavaScript is dumb, so we need to tell the `updateLabel` what `this` means. That line is how we do that.

Okay, so now let's say we want some fancier displaying in the button - let's make it into a React component.

```JavaScript
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label : "off"
        }
        this.updateLabel = this.updateLabel.bind(this);
    }
    updateLabel() {
        if (this.state.label === "off") {
            this.setState({label : "on"});
        }
        else {
            this.setState({label : "off"});
        }
    }
    render() {
        return (
            <div>
                <h1>{this.state.label}</h1>
                <FancyButton onClick={this.updateLabel}/>
            </div>
        );
    }
}

function FancyButton(props) {
    return (
        <button onClick={props.onClick}>
            Click Me!
        </button>
    );
}
```

Note that the property `onClick` of `FancyButton` could be named anything.

#### Conclusion

One important thing we learned here: the `state` should be managed by the HIGHEST level component that might need it. If two components use the same data, it should be managed by a component that is a parent to both of them.

### Hooks

A lot of the time, we don't really need to maintain a lot of states - in the previous example, we only needed to maintain a single label. In these cases, it's a lot better to use what's called
a React Hook, instead of a class.

Hooks work within a function, and basically allow it to maintain a state. Use them when you need
to display something, but nothing else depends on that object.

For example:

```JavaScript
import React, { useState } from 'react';

function Component (props) {
    const [label, setLabel] = useState('off');
    return (
    <div>
        <h1>{this.state.label}</h1>
        <FancyButton onClick={
            if (label == 'on') {
                setLabel('off');
            } else {
                setLabel('on');
            }
        }/>
    </div>
    )
}
```

Wow! So different! So what's going on here?

Well, React basically has these functions - hooks - like `useState` that allow you to define
an object that React will manage, and allow you to (say) update that state, or do something when
the state is updated.

You can read more about hooks [here](https://reactjs.org/docs/hooks-intro.html).
