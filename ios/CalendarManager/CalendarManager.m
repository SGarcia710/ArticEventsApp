//
//  CalendarManager.m
//  ArticCatalogApp
//
//  Created by Sebastian García on 11/01/24.
//

// #import <Foundation/Foundation.h>


#import "CalendarManager.h"
#import <EventKit/EventKit.h>

@implementation CalendarManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)title location:(NSString *)location startDate:(NSDate *)startDate endDate:(NSDate *)endDate)
{
    EKEventStore *eventStore = [[EKEventStore alloc] init];
    [eventStore requestAccessToEntityType:EKEntityTypeEvent completion:^(BOOL granted, NSError *error) {
        if (!granted) {
            NSLog(@"Permission denied to access calendar");
        } else {
            EKEvent *event = [EKEvent eventWithEventStore:eventStore];
            event.title = title;
            event.location = location;
            event.startDate = startDate;
            event.endDate = endDate;
            event.calendar = [eventStore defaultCalendarForNewEvents];

            NSError *eventError = nil;
            [eventStore saveEvent:event span:EKSpanThisEvent commit:YES error:&eventError];
            if (eventError) {
                NSLog(@"Error saving event: %@", eventError);
            } else {
                NSLog(@"Event added successfully!");
            }
        }
    }];
}

@end
