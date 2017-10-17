# SharePoint-Calendar-Event-Dates-Generator
SharePoint Calendar saves an event with recurrence rules as xml in RecurrenceData column. 
The following is an example for recurrence rule.


~~~ xml
<recurrence><rule><firstDayOfWeek>su</firstDayOfWeek><repeat><monthly monthFrequency="1" day="16" /></repeat><repeatForever>FALSE</repeatForever></rule></recurrence>
~~~


If you are looking for a library that generates the same list of dates by looking into the RecurrenceData xml then do check the datesgenerator.js library. This library will generate you list of dates based on recurrence rule. 

