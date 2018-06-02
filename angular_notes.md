# Angular Course

What is Angular? A JavaScript framework that allows you to create reactive, single-page applications.

**Different Angular Versions:** A2 = re-write of A1, completely. Angular 4/5/6 = latest versions of A2. >A2 is referred to just as "Angular". Angular 1 is referred to as "AngularJs".

> CLI Deep-Dive: If you want to dive deeper into the Angular CLI, look at the [official documentation](https://github.com/angular/angular-cli/wiki)

### First App

You should always use the Angular CLI - you can find all steps in the [documentation](https://cli.angular.io/).

Node is required to use the CLI, as well as using npm. If you hadn't already, you'd install node, which comes w/npm.

1. `sudo npm install -g @angular/cli`
2. `ng new name_of_app` <= creates app & folders + heavy optimizations, similar to Rails
3. `cd name_of_app`
4. `ng serve` <= runs dev server & compiles app so you can see in browser. May optionally need to specify `ng serve --host 0.0.0.0 --port 4201`, using your machine's IP & port, depending on your dev environment.

Angular's dev server will automatically watch your files & rebuild the project whenever you save & change something.

### Using Bootstrap for Styling

1. stop server. Make sure you're inside the project dir on CLI:
2. `npm install --save bootstrap@3` <= Downloads & installs in node_modules
3. In `angular.json` =>

```javascript
"styles": [
  // must be above, so you can overwrite app-specific styles in styles.css
  "node_modules/bootstrap/dist/css/bootstrap.min.css", // imports the css file
  "src/styles.css"
]
```

4. Restart server. Bootstrap is now included.

## Basics

### How Angular gets loaded/started

1. The CLI auto-injects all necessary project files as scripts into `index.html`. That file is our "one-page" app template.
2. The `<app-root>` component is where Angular will inject whatever components we create when that specific URL is visited. This is a dynamic part of our page. (more on that below)
3. The first code that is executed is whatever is in our `main.ts` file.
4. In `main.ts`, `AppModule` is passed in to a method that starts the Angular app.
5. This refers to `app.module.ts`, which contains the `bootstrap` array that contains all components Angular should know at the time it compiles our `index.html` file.
6. It reads each of those, and goes to each file we setup for configuration (i.e., `app.component.ts`).
7. From this file, it reads the selector `app-root`.
8. From there, it looks for `app.component.html` to insert in the selector.

### Components

You build your app by composing some components. Other components can then be nested within others. This allows us to separate business logic & reuse components, making our app much more "modular".

### Create new component

The `app.component.html` is the root component, so all other components will be added to that one & nested within it. Each component should have it's own folder under the `app` folder, and it's a best practice to name it the same name as the component.

A component is simply a TypeScript class, so Angular can instantiate it & create objects based on our blueprint. See project files w/notes on how to create them & some syntax examples.

**What is a module?**: modules package pieces & components Angular uses into packages.

`AppModule` gives Angular information about the features your app uses. If you don't tell Angular that each component exists, it won't use it or compile it. We have to register it in the `@NgModule` declarations array.

**Create Components w/CLI**:

1. Leave `ng serve` window running, and open a new terminal.
2. Use `ng generate component comp_name` or `ng g c comp_name` for short.
3. CLI automatically updates the `app.module.ts` file to declare the component.
4. It also automatically creates the `comp_name.components.ts` file w/the appropriate code.

### Styling Components:

We've been using *external template files*, but we can also use *inline templates*, where we would define the html in the typescript files.

Most of the time it's best to use an external template file. The same can be done for styling w/CSS. Note the different options for selectors below that would allow easy styling w/CSS.

You could modify your `comp_name.component.ts` file as such:

```javascript
import { Component, OnInit } from '@angular/core';

@Component({
  // can change the selector to act as html attribute
  // selector: '[app-servers]', => in html: <div app-server></div>
  // can change as css selector (not supported with IDs)
  // selector: '.app-servers', => in html: <div class="app-servers"></div>
  selector: 'app-servers',
  // use template instead of 'templateUrl'
  template: `<app-server></app-server>
             <app-server></app-server>`,
  // use styles instead of 'styleUrls'
  styles: [`
    h3 {
      color: dodgerblue;
    }
  `]
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

### Data Binding

1. String Interpolation
2. Event Binding
3. Property Binding
4. One way data binding (to react to events)
5. Two-way binding (to react & update)

This is essentially communication between your Ts code & the HTML template. Ex: we want to output data from Ts to include in our markup, or we could use property binding. Data can also go the other way - like if a user clicks a button (events) to trigger some code in our Ts files.

There is also **two-way-binding** - reacting to events & output some sort of data.

Templates use **string interpolation**. The only restriction using it is that whatever expression is written inside must return a string or be convertable to a string, and you can't write multi-line expressions in them.

**Property Binding**: There are several ways to use property binding, but here we learn about binding to html properties using a specific sytax. Essentially, you use square brackets & set it equal to a string that resolves to something.

Example: After 2 seconds, the button will no longer be disabled.

```javascript
// servers.component.ts
// ..code ommitted
export class ServersComponent implements OnInit {
  allowNewServer = false;

  constructor() {
    setTimeout( () => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

}
```

```html
<button class="btn btn-primary" [disabled]="!allowNewServer">
  Add Server
</button>
<p>{{ allowNewServer }}</p> <!-- will automatically change as well, string int -->
<p [innerText]="allowNewServer"></p> <!-- this also works; property binding -->
```

**NOTE**: Don't mix string interpolation & property binding syntax.

### Event Binding

In your component class, define the method. Then, add the syntax `(eventName)="valid_Ts_expression_or_method()"`.

You can bind to all properties & events that are triggered of HTML elements. Googling "ELEMENT_NAME properties" or "ELEMENT_NAME events" will tell you what events/properties are available. The only one that is different is "click" instead of "onclick".

**NOTE** Using `$event` gives you access to event data for use in your functions. It is a reserved word.

**Two-Way Data Binding**: Reacting to changes or events. Event - data change - reflected in application.

Examples:

```html
<!--Use of one type of syntax to bind to an event & execute a function w/event data: one way binding-->
<input type="text"
       class="form-control"
       (input)="onUpdateServerName($event)"/>

<!--User of two-way data binding syntax w/directive ngModel. Will trigger on input &-->
<!--update value of serverName automatically. It will also update value of input-->
<!--element if we change serverName somewhere else.-->
<input type="text"
       class="form-control"
       [(ngModel)]="serverName"/>
```

**NOTE** FormsModule is Required for Two-Way-Binding. You need to enable the ngModel  directive. This is done by adding the `FormsModule`  to the `imports[]`  array in the AppModule.

You then also need to add the import from `@angular/forms` in the `app.module.ts` file:

`import { FormsModule } from '@angular/forms';`

### Directives

These are instructions in the DOM. Components are directives w/a template, but there are directives w/out a template.

Example of **structural directive** (one that changes the DOM) with `*ngIf`: see below for the conditional directives if/else statement, **attribute directives** for styling elements w/`ngStyle` & `ngClass` (no star), then using `ngFor`.

```html
<!--in servers.component.html-->
<!--structural directive - must begin with a * -->
<p *ngIf="serverCreated; else noServer">Server was created, server name is {{ serverName }}</p>
<!--use #noServer, as referenced above, with the ng-template element-->
<ng-template #noServer>
  <p>No Server Was Created.</p>
</ng-template>

<!--another structural directive to populate a list-->
<app-server *ngFor="let server of servers"></app-server>

<!--server.component.html-->
<!--uses square brackets to use property binding with the directives -->
<!--component method getColor() determins color-->
<p [ngStyle]="{backgroundColor: getColor()}"
   [ngClass]="{online: serverStatus === 'online'}">
  Service w/ID {{ serverId }} is {{ getServerStatus() }}
</p>
```

```javascript
// server.component.ts
import { Component } from "@angular/core";

// pass Js object to configure the decorator, to tell Ag what to do w/class
@Component({
  selector: "app-server", // html tag to re-use in templates. Must be unique
  templateUrl: "./server.component.html",  // relative path to html template
  styles: [`  // use with ngClass
    .online {
      color: white;
    }
  `]
})
export class ServerComponent {
  serverId: number = 10;
  serverStatus: string = "offline";

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? "online" : "offline";
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor() {
    return this.serverStatus === "online" ? "green" : "red";
  }
}

// servers.component.ts
// this code added to class:
servers = ["First Server"];

onCreateServer() { // "on" is convention for reacting to an event
  this.serverCreationStatus = `Server created! Name is ${ this.serverName }.`;
  this.servers.push( this.serverName );
  this.serverCreated = true;
}
```

For plenty of examples using **directives**, see the included project herein.

### Course Practice Application:

**Planning**:

Shopping List & Recipe App. First you should start by planning what components you think you'll need. All angular apps have a root component that holds all other components.

### Models in Angular

In the main `recipes` folder, you might have a file `recipe.model.ts`:

```javascript
export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;

  constructor(name: string, desc: string, imgPath: string) {
    this.name = name;
    this.description = desc;
    this.imagePath = imgPath;
  }
}

// shortcut way with Ts
export class Ingredient {
  // shortcut to declaring properties & their types. Will auto create & assign them.
  constructor(public name: string, public amount: number) {
  }
}
```

### Angular Error Messages

Debugging is supported by the console in the browser by going to the "sources" tab...you can place breakpoints in the `main.bundle.js` file & when you do that, the source `file.ts` comes up. This is because the CLI places sourcemaps in our code that allow it to be translated & run in the browser as plain Js.

Finding the correct place in a large compiled `main.bundle.js` file can be quite cumbersome, but you can directly access Ts files under `webpack/./src/app/` to do the same thing.

You could also use **augury** as a chrome extension to help debug Angular apps. Just google it, add the extension to chrome, and choose it from the top tabs in chrome dev tools. Check out [the website](https://augury.angular.io/) for more info

## Dive Deeper: Components & Data Binding

### Custom property binding:

We can emit our own events through custom property binding! By default, all properties on a component are only accessible *inside* the component. You have to be explicit as to which properties you wish to expose to the "outside".

> NOTE: Passing data with property binding / @Input() works only directly from a parent to a child component. Use custom event binding (below) to go from child to parent.

To do this, you must add a decorator to the property & import that functionality in the Ts file:

```html
<!-- app.component.html - "the parent" -->
<div class="container">
  <app-cockpit></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element 
        *ngFor="let server of serverElements"
        [element]="server">
      </app-server-element>
    </div>
  </div>
</div>

<!--server-element.component.html-->
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <p>
      <strong *ngIf="element.type === 'server'" style="color: red">{{ element.content }}</strong>
      <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
    </p>
  </div>
</div>
```

```javascript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{name: "Test Server", type: "server", content: "Just a test"}];
}

// server-element.component.ts
// notice we import "Input" so we can use as a decorator on a property
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {
// property has a decorator so it can be exposed to the outside.
  @Input() element: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit() {
  }

}
```

Another explanation:

```html
<!--parent.component.html-->
<p>parent works!</p>
<app-child [messageReceivedByChild]="messageSuppliedByParent"></app-child>

<!--child.component.html-->
<p>
child works! {{messageReceivedByChild}}
</p>
```

```javascript
// parent.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
selector: 'app-parent',
templateUrl: './parent.component.html'

})

export class ParentComponent implements OnInit {
constructor() {}
ngOnInit() {}

messageSuppliedByParent: string = "I figured it out"

}

// child.component.ts

import { Component, OnInit, Input } from '@angular/core';

@Component({
selector: 'app-child',
templateUrl: './child.component.html'
})

export class ChildComponent implements OnInit {
@Input() messageReceivedByChild: string;
constructor() {}
ngOnInit() {}
}
```

See this [simple app for more/better examples](https://stackblitz.com/edit/wr-angular-custom-property-binding?file=app%2Factor.component.ts)

**Alias Properties**:

```javascript
// server-element.ts
// "srvr" is the alias to use in .html files; must use it to work.
  @Input("srvr") element: {type: string, name: string, content: string};
```

### Custom Event binding:

Here (in our `databinding` application), we want to be able to tell the parent object that something happened & see changes reflected. Ex: we created a server in a child component, and want to reflect that in a sibling component that is also inside the same parent.

To see this in action, look at the following files in the `databinding` folder:

- `databinding/src/app/cockpit/cockpit.html`
- `databinding/src/app/cockpit/cockpit.ts`
- `databinding/src/app/app.html`
- `databinding/src/app/app.ts`

**SUMMARY**:

Using *custom property binding*, you can pass data from a **parent** component to a **child** component, and with *custom event binding*, you can pass data from a **child** to a **parent** - which could then be passed to other children of that parent.

In this way, Angular controls who is modifying data. Further down, more flexible data binding between components will be explored. They are called *services*.

### Understanding view encapsulation

The behavior of CSS in angular files (i.e. `app.component.css`) is such that those CSS styles will only apply to elements directly in that template - not children or parents. This way we know that when we define styles in these files, they ONLY get applied to that component. Angular does this by putting unique attributes on all html elements within a component so it knows to style those with specific rules.

This means that we will have to be careful about extracting the proper CSS when we split components.

If you wanted to override this behavior:

```javascript
// server-element.ts
import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // Can use .None (use styles application-wide), .Native (uses shadow DOM - only
  // browsers that support this)
  // or Emulated (default)
  encapsulation: ViewEncapsulation.None
})
```

### References in Templates

Note that you can create local references in your templates for use elsewhere - and they can be created on any element. However, you can't use them in Ts files - only the template files. This can be done by adding `#yourName` & then referencing `yourName` later.

### More on Directives + Custom Directives

**Attribute** Directive: changes html attributes. Doesn't modify DOM. (possibly with event or data binding)
**Structural** Directives: changes the DOM (add or delete elements). (look like attribute w/leading *)

> NOTE: You can't have more than one structural directive on the same element.

**Creating a basic attribute directive**: see "./directives/src/app/basic-highlight" folder for example. When creating these manually, you must remember to register them in `app.module.ts` under both declarations & the imports.

> NOTE: It's not really a good practice to directly access elements, however. Angular can render templates w/out a DOM. Angular isn't limited to the browser - there might be environments where may not have access to DOM. If you try to change DOM then, you might get error. Ergo it's better to use the "renderer" to build attribute directives.

Learn more about Renderer2 methods [here](https://angular.io/api/core/Renderer2)

Use `ng g d directive-name` on the CLI to generate a directive

## Services & Dependency Injection

**Services**: This is a class in Angular that allows you to centralize your code to keep it DRY. It generally contains more business logic or application functionality, whereas components just enable the user experience. They can also be helpful in communication between components.

**providing a service** = tell Ang how to create the service, or instance

> NOTE: Using hierarchical injectors is the correct way to use these, so all children of the parent component will receive an instance of the service. The highest level to provide a service is in the `app.module.ts` - it will then be available application-wide.

Because of the hierarchical nature of services, Angular will overwrite instances of a Service class in child components if you provide it in them. You may want this, but you may not. In order to use the service, you must still import it & keep the instantiation in the constructor function of the component, but you need to remove it from the `providers` array in the component decorator.

To inject a service into another service, you MUST provide it in the `app.module.ts` file - it's not possible by just specifiying it in a component. To see the rest of the code examples, see the "services" folder & associated files.












