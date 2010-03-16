
Pintura example as a PINF program
=================================

**Status: EXPERIMENTAL - Report issues to [pinf-dev google group](http://groups.google.com/group/pinf-dev)**

Requirements:

  * [PINF](http://github.com/cadorn/pinf) - [Installation instructions](http://github.com/cadorn/pinf/blob/master/docs/Install.md)



From Source
-----------

Assumption: You have PINF installed.

    pinf checkout-workspace -s github.com/cadorn/pintura

    pinf map-sources

    pinf build-program programs/example

    pinf launch-program programs/example --bin jackup

Visit: [http://localhost:8080/](http://localhost:8080/)

The wiki data is stored at:

    ~/pinf/data/registry.pinf.org/cadorn.org/github/pintura/programs/example-program/master

To work on perstore and commonjs-utils:

    pinf checkout-workspace -s github.com/cadorn/perstore
    pinf checkout-workspace -s github.com/cadorn/commonjs-utils

    pinf map-sources

    pinf build-program programs/example

You can now make changes in the workspaces at `~/pinf/workspaces/` and launch the example program to test them.
You only need to re-build the program to change a dependency.

If you want to contribute back to the projects you need to fork the github repository first and replace the *cadorn* username
with your own.

To get a list of workspaces, the packages within them and version control information you can run:

    pinf show-workspaces
