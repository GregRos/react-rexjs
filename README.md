# React-TypeScript Extensions
`react-ts` is a library that provides an assortment of convenience features and advanced functionality that make working with React using TypeScript easier and more productive.

## TsComponent
The library provides a `TsComponent` class which inherits from `React.Component` and adds a few handy features

### `withState`
This is a method that accepts a `mutator : (TState => void)`. It behaves similarly to `setState(TState => TState)`, except that instead of accepting a reducer, it accepts a mutator that modifies the existing state. In fact, in order to maintain immutability, the state is first deep-copied, then mutated.

This is very convenient behavior because the default type definition for `setState` is awkward to use. 

## Handy type definitions
`react-ts` provides a few handy type definitions for commonly used types:

1. `ReactConstructor<TProps>`, which specifies the type of a constructor for a `React` component. This is the type of `MyComponent` itself, when used as a value. Here is a trivial example:

		class MyComponent extends TsComponent<MyProps, {}> {}
		let SomeComponent : ReactConstructor<MyProps> = MyComponent;
		let tree = <SomeComponent />;


## Lifecycle decorators
This feature allows you to decorate your methods so that they are invoked as part of the component's lifecycle. To use this feature, you must enable experimental decorator support by adding the following to your `tsconfig.json` file:

	{
	  "compilerOptions" : {
	    "experimentalDecorators": true
	  }
	}

After doing this, you can attach decorators to any method as follows:

	class MyComponent extends React.Component<TProps, {}> {
		@Life.willReceiveProps
		doThisOnReceiveProps(props : TProps) {
			//this method will be invoked when componentWillReceiveProps is invoked.
		}
	}

Lifecycle decorators allow you to designate a number of methods to be invoked during the same life-cycle step:

	class MyComponent extends React.Component<TProps, {}> {
		@Life.willReceiveProps
		doThisOnReceiveProps(props : TProps) {
			//this method will be invoked when componentWillReceiveProps is invoked.
		}
		
		@Life.willReceiveProps
		alsoDoThis(props : TProps) {
			//this method will also be invoked
		}
	}

In addition, in most IDEs with TypeScript tooling they will display the lifecycle methods available in AutoComplete.

### More of Lifecycle Decorators
Behind the scenes, these methods will be placed into a special invocation list, and an invoker will be inserted under `componentWillReceiveProps` that calls every method in that list.

If the class has a `componentWillReceiveProps` member in its prototype chain, then that existing method will be incorporated into the list as well. If a component already has an invocation list for the lifecycle hook, then the existing invocation list is changed for the prototype in which the new method is defined in, but not for more derived prototypes.

This allows derived components to set up their own hooks without disrupting the behavior of parent components or for a single component to set up multiple semantically separate hooks.

Defining `componentWillReceiveProps` explicitly in a more-derived prototype will consistently override all of this behavior -- only the overriding method will be called. Furthermore, if after you override a lifecycle method you use `@Life` decorators on that prototype or more derived prototypes, the decorators will not be aware of any `@Life` decorators specified in more-derived classes.

I understand this is hard to understand, but on the bright side, it will probably not come up often.

## rexjs integration
`rexjs`  (not `rxjs`, which is something different) is a library for change notification and value propagation. The library is framework-agnostic, but `react-ts` comes with some features that leverage it.