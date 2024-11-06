# Suspense

1. A component can be suspensble component from parent component in 2 cases
   1. if the child component is loaded lazily ( using lazy import )
   2. if the child component is calling a suspensable function that is created outside the child compenent, and the  has direct access to the suspensable function - *important*

   


### Suspensable Function

A function that is  
   throwing promise(thenable object)  
   later returning any value or throwing error 


A function that is  
  thoring a pending promise  
  after promise is fullfilled it is retruning/throwing some value