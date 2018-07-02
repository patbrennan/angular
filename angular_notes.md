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

## Routing

Routing allows us to have different paths to different places in our app. Essentially the functionality renders the URL, but we tell Angular where & what component to render.

- Edit the `app.module.ts` file 
  - import all necessary files (see `routing` project folder)
  - add the routes array w/correct parameters
  - import it in the @NgModule decorator
  - Edit the app.html file w/`<routing-outlet>` to tell Ng where to render the component.

When working w/paths in the html files, you can specify relative paths using "../" or "./", as in `routerLink="../servers"`.

> NOTE on observables: Angular "cleans up" your app w/observables in the background after a component is destroyed & a subscription is no longer needed, for example. Normally you would have to do this manually. Details on this can be seen in the `routing` project files.

**Redirection Path Matching Note**:

In our example, we didn't encounter any issues when we tried to redirect the user. But that's not always the case when adding redirections.

By default, Angular matches paths by prefix. That means, that the following route will match both `/recipes`  and just `/`

`{ path: '', redirectTo: '/somewhere-else' }` 

Actually, Angular will give you an error here, because that's a common gotcha: This route will now ALWAYS redirect you! Why?

Since the default matching strategy is "prefix" , Angular checks if the path you entered in the URL does start with the path specified in the route. Of course every path starts with ''  (Important: That's no whitespace, it's simply "nothing").

To fix this behavior, you need to change the matching strategy to "full" :

`{ path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }` 

Now, you only get redirected, if the full path is ''  (so only if you got NO other content in your path in this example).

---

**Understanding Location Strategies**

The server hosting your actual production application has to be configured such that a 404 error returns `index.html`. This is because all URLs are parsed by the server hosting your app first, and won't properly render the page you want unless Angular takes over routing.

For syntax details on dealing w/when this doesn't work & supporting very old browsers, see the `app-routing.module.ts` file in the `routing` project folder.

> NOTE: When you use observables that you create (not built-in angular observables), you must do the "clean up" work yourself. More info on this in the observables section.

## Observables

Definition: Essentially a data source (user input) events, https requests, triggered in code...it's a generalized mechanism for push-based notifications, also known as "observer design pattern". The observable object sends notifications (provider). The observer is the class that receives them. Good video [here](https://www.youtube.com/playlist?list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi).

The observer can react to different data package "hooks":
- Handle Data
- Handle Error
- Handle Completion

You write the code that is executed based on each of these types of data packages.

> NOTE: You may create a memory leak if you create an observable but don't destroy it when necessary. Even though a component may be destroyed, the subscription / observable still persists. You must make sure you unsubscribe when you leave the area that handles the observable.

> TIP: Consider using a **Subject** instead of Ng event emitter. It can easily do cross-component communication. You can find more on Subjects in RxJs documentation.


What are operators? They allow you to transform the data you receive into something else, and still stay in the Observable world.

**RxJs 6.0+ syntax**:

```javascript
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Observer, Subscription, interval } from "rxjs";
// import "rxjs/Rx"; = pre-6.0 import for operators
import { map } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // store subscriptions here so they can be destroyed, preventing memory leaks
  numbersSubscription: Subscription;
  customObsSubscription: Subscription;
  
  constructor() { }

  ngOnInit() {
    // our own custom observable: emit numbers at a fixed interval
    const myNumbers = interval(1000)
    // > 6.0 rxjs means you have to pass operators into pipe
      .pipe(map( // maps data you get into new Obs w/any transformation of choice
        (data: number) => {
          return data * 2;
        }
      ));
    
    this.numbersSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );
```

## Forms in Ng

**Template-Driven** Approach: Ng infers the form object from the DOM.

**Reactive** Approach: Form is created programmatically & synchronized w/the DOM.

## Pipes

**Pipes**: Allows you to transform output in your template. They will be as assigned & created in the Ts code, but once rendered it will look differently using a pipe.

> **NOTE**: If you change a pipe (like the custom filter pipe in the project files, for example) to update every time there is a data change, you have to re-run that pipe, which may cause big performance issues for your app. By default, Angular doesn't do this for this reason. Be aware of this when forcing them to update whenever an array/object is changed or updated.

## HTTP:

**Note on differences w/Ng6+:

Don't forget - if you're using Angular (and therefore also RxJS 6+) and you're NOT using rxjs-compat  (npm install --save rxjs-compat  - you may ignore this lecture then, use the code as shown in the videos!), you have to use operators like map()  differently:

Instead of

`....map(...)` 

use

`....pipe(map(...)) `

map also needs to be imported:

Instead of 

`import 'rxjs/Rx';`

use

`import { map } from 'rxjs/operators';`


When doing any type of data transformation, it is best to centralize this in the file (service file in our example files) responsible for making http requests, so as to be DRY.


Using Ng6, you then have to use the `catch()` operator you'll see in the next lecture a bit differently.

Instead of

```javascript
....catch(error => {
    return Observable.throw(...)
}) 
```

use

```javascript
....pipe(catchError(error => {
    return throwError(...)
}))
```

And make sure to import it:

Instead of 

`import 'rxjs/Rx';` and `import { Observable } from 'rxjs/Observable';`

use:

`import { catchError } from 'rxjs/operators';`

and

`import { throwError } from 'rxjs';`

## Authentication w/SPA

In an SPA, the front-end code handles all the rendering of the html, unlike a traditional client-server "full-stack" web app. The SPA still sends Auth Information, but doesn't create a session. Still, the server sends back a token (typically a JSON web token) which encodes some information about the user & is hashed w/a secret only known by the server. This token is used to authenticate on future requests.

For using firebase as an authentication service with Ng, run:

`npm install --save firebase`

This will install some Ts files for use w/the project.

---

**NOTE**: Follow this guide for preventing your creds from entering a git repo:

If you are using Git and you pushed your repo to GitHub or a similar site, you have inadvertently exposed your API key to the public. To avoid this, you should use environment files.

Angular CLI should have created a /src/environments file for you. This is a great place to store this information.



1 - Create `src/environments/environment.example.ts`

in this file, create your contract of what environment variables your app will be expecting. These should be variables that will change depending on whether your app is in dev/staging or production.

My example file:

```javascript
export const environment = {
    production: false,
    firebaseApiKey: '',
    firebaseAuthDomain: '',
  };
```

2 - Edit your /.gitignore 

You will want to remove all your environment files from your Version Control *except* you want your contract included as a reminder of what variables you need to set.

Edit your `/.gitignore`  file and add the following lines:

```
# Angular Environment
/src/environments/*
!/src/environments/environment.example.ts
```

This will ignore all the files in that folder, except for your example file.


2.1 - Removed tracked files from Git for FUTURE commits

So, we added this to .gitignore, but we've already committed your environment files. So we need to tell git to remove them. Open your terminal and in your project root, run the following command:

`git rm --cached -r src/environments`


3 - Edit and populate your `/src/environments/environment.ts`  file.

Similar to the example, except actually include your real API key, etc.


4. Edit your `app.component.ts file` to pull in this data

```javascript
// ...
 
// Add this import to get your env variables
// Angular will pull in the correct script @ build time
 
import { environment } from '../environments/environment';
 
// ...
// Use your env variables to initialize your firebase connection
 
  ngOnInit() {
    firebase.initializeApp({
      apiKey: environment.firebaseApiKey,
      authDomain: environment.firebaseAuthDomain,
    });
 
// ...
```

Now, if you were like me, and you already pushed your changes to GitHub, you will want to undo that, but if it was several commits ago, that will be a pain.

If that is too much pain, I bet you can use firebase to revoke the old API key and issue a new one if that is easier.

> NOTE: sSee [this link](https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public) and [this link](https://stackoverflow.com/questions/35418143/how-to-restrict-firebase-data-modification) in relation to firebase security & properly securing it. There are also checklists in getting started w/Firebase, as well as [this article](https://javebratt.com/hide-firebase-api/) which details more about how to secure it.

When you call the `signin` method using the Firebase SDK, they automatically store the auth token (otherwise you'd have to manually store it).

## Modules & App Optimization

In general, all the components, directives, and other files that make up your app are registered in a module. Modularity of your app makes it easier to *not* include modules you don't need, making the files smaller & the app more performant. It also makes it more maintainable. Modules usually bundle certain types of functionality together.

NOTE that the `imports` in the .ts files are simply a Ts feature; not Angular. These are required for Ts to know where the proper code packages live.

A typical custom module you might add may be a feature module. This may be done to increase performance & make the code reusable by putting common functionality or a portion of your interface into its own module.

> NOTE: You must NOT duplicate declarations between modules!

> NOTE: If you create a feature module, you must also move the routes.

In the case where there is shared functionality between two modules, you can extract this & put the functionality into a shared module. It isn't necessarily a feature module. For examples, see the `recipes` project `dropDownDirective` example. Typically there is only one shared module in an app, but you could further extract shared functionalities into their own modules.

### Lazy Loading (modules & routing)

When a larger Angular app is first loaded, normally all modules & components, etc are loaded - even though they may never be visited or used. Therefore we can use **Lazy Loading** to improve the performance of our app by only loading modules / routes when they are needed & visited.

To see this in action, check out the `recipes module` in the `recipes` project folder.

What if you want to use route protection (`canActivate`  to be precise) on lazily loaded routes?

You can add `canActivate` to the lazy loaded routes but that of course means, that you might load code which in the end can't get accessed anyways. It would be better to check that BEFORE loading the code.

You can enforce this behavior by adding the `canLoad` guard to the route which points to the lazily loaded module:

```javascript
{ path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', canLoad: [AuthGuard] }
```

In this example, the `AuthGuard` should implement the `CanLoad` interface.


> NOTE: If you lazily load a module & provide a service within that module, Angular by default will instantiate another instance of the service. Also, you should never provide a service in a shared module, especially if you plan to use them in lazy-loaded modules, because it will also create a child injector & new instance of the service.

Stated another way, "basically if we want to share a service accross the application all we need to do is to provide it in the AppModule hence there is no need to provide it in the Shared Module, or we want to share the service accross a feature module then provide it at the module itself wheter is lazy loaded or eagerly loaded."

For restructuring reasons, it's best to put things that are app-wide, like a header component or a directive used only in the app component, into the `CoreModule`.

> NOTE: Guards are the only services you should provide in a `name-routing.module` file.

### Ahead-of-Time Compilation

Note that Angular compiles your templates into javascript (mainly for performance reasons, but there are other benefits). Don't confuse this w/the Ts files being compile to Js - that is done by the CLI. The default is just-in-time compilation:

`Development > Production > App loads in Browser > Ng Parses & Compiles Templates to Js`

In ahead-of-time compilation:

`Development > Ng Parses & Compiles Templates to Js > Production > App Loads in Browser`

There are some advantages of AoT Compilation:

1. Faster App Startup (compilation doesn't happen in browser)
2. Templates get checked during development (for errors)
3. Smaller File Size - unused features can be stripped out (Ng knows what you do & don't use) & the compiler itself isn't shipped.

To accomplish this w/the CLI:

`ng build --prod --aot`

### Preloading lazy-loaded routes

Essentially, preloading a lazy-loaded route is just prioritizing & timing when other application code gets loaded. The app would not load code from lazy-loading routes until the main app code was loaded & ready. In the background, when the user is clicking around & using the app, the code would be downloaded & available so latency isn't an issue when selecting your lazy-load routes.

To implement, in `app-routing.module.ts`:

```javascript
@NgModule({
  imports: [
    // preload all lazy-loaded modules after the app has been loaded using preloadingStrategy
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [ RouterModule ] // exports the configured router
})
```

## Deployment

1. Build your App for production (`ng build --prod --aot`) - consider AoT Compilation. The new `dist` folder will be created from here.
2. Set correct <base> element: for example.com/my-app you should have `<base href="/my-app/">`
3. Make sure server ALWAYS returns `index.html`: Routes are registered in Angular app, so server *will not know your routes*. Return `index.html` in case of 404 errors. This will allow Ng to render the 404 because the index.html file will send the Ng app.

## New HTTP Client - An Alternative

**Interceptors**: These allow us to do something upon every request / response cycle. A good use case is to set the URL & auth token on every request so it doesn't have to be done manually. See `auth.interceptor.ts` for examples inside the `new-http-client` folder.

**Excluding an interceptor**: Currently Angular doesn't support this, but a good workaround from SO:

```javascript
import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable()
export class HttpBackendClient extends HttpClient {
    constructor(handler: HttpBackend) {
        super(handler);
    }
}
```

And then added it to my module:

```javascript
@NgModule({
    providers: [
        HttpBackendClient,
        AuthService
    ],
    imports: [HttpClientModule]
})
export class ServicesModule {}
```

And use it like this:

```javascript
@Injectable()
export class AuthService {

    constructor(private http: HttpBackendClient) {
    }
}
```

## NgRx Basics

NgRx is a redux-like patter to manage application state. Normally we were managing this using services & subjects, etc. However, now we're using a different, perhaps more elaborate approach with NgRx, which isn't part of the Angular core code.

> BEFORE MOVING FORWARD: Good idea to watch [these videos](https://www.youtube.com/playlist?list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi)

### Notes on RxJs:



## Angular Universal

This allows rendering of html on the server instead of the browser/device. This is useful when:

1. We want our app to be SEO-able (crawlable)
2. We want a static page to load quickly
3. We want better performance on compute-limited devices

---

For notes on how to implement this, google "angular universal cli" & see the [wiki page](https://github.com/angular/angular-cli/wiki/stories-universal-rendering)

- Once all steps are complete, run `ng run your-project-name:command`, (like `ng run recipes:server`). The `your-project-name` matches the one in the `angular.json` file.
- Once that is complete you need to add a node server that is capable of running & compiling the app. See docs for code, but you also must install express with `npm intsall --save express`.
- You must also run the normal `ng build --prod` to get all the files + AoT + lazy-loading, etc & builds it into the proper folders per the `angular.json` file.
- Create the rest of the necessary files & follow the rest of the instructions.
- Copy `"webpack:server": "webpack --config webpack.server.config.js --progress --colors"` into your `package.json` file under scripts for ease of running it in the future.
- Run `npm run webpack:server` - enter "yes" when it asks if you'd like to install the webpack-cli (only on the first time).
- This creates the `server.js` file inside the `/dist` folder.
- Run `node dist/server.js`.
  - If you're getting a `StaticInjetionError`, go to the `webpack.server.config.js` file & under target, add: `mode: 'none'`, then re-run `npm run webpack:server`.

You would then need to deploy this application to a server capable of running a node.js server.

Server-side rendering (SSR) can make sense because of SEO considerations (crawler should see what your users see) or because you want to deliver a finished page to your users (rather than creating the page in the browser).

But that also has one important implication: **You MUST NOT use any browser-only APIs like `document.querySelector()` in your Angular code!**

## Animations

Angular 4+ animations:

With the release of Angular 4, the general syntax of Angular Animations didn't change. 

However, the animation functions were moved into their own package and you now also need to add a special module to your `imports[]` array in the `AppModule`.

Specifically, the following adjustments are required:

- You probably need to install the new animations package (running the command never hurts): `npm install --save @angular/animations`
- Add the `BrowserAnimationsModule` to your `imports[]` array in `AppModule`
- This Module needs to be imported from `'@angular/platform-browser/animations'`  => `import { BrowserAnimationsModule } from '@angular/platform-browser/animations'`  (in the AppModule!)
- You then import trigger , state , style  etc from `@angular/animations` instead of `@angular/core`

Importing your own animations to keep your code more readable / dry:

Like this:

```javascript
// animation.ts
import { trigger, state, style, transition, animate } from '@angular/core';
 
export const fade = trigger('fade', [
    state(...),
    state(...),
    transition(...),
    ...
]);
```

This allows you to import this animation-storage file in any place you want to use it. Or even better: It allows you to import EXACTLY the animation you need and not the complete class like in the static-class approach.
