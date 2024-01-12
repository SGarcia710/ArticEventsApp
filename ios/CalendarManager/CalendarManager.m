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

RCT_EXPORT_METHOD(addEvent:(NSString *)title
                  location:(NSString *)location
                 startDate:(nonnull NSNumber *)startDate
                   endDate:(nonnull NSNumber *)endDate)
{
    EKEventStore *eventStore = [[EKEventStore alloc] init];
    [eventStore requestAccessToEntityType:EKEntityTypeEvent completion:^(BOOL granted, NSError *error) {
        if (!granted) {
            NSLog(@"Permission denied to access calendar");
        } else {
            EKEvent *event = [EKEvent eventWithEventStore:eventStore];
            event.title = title;
            event.location = location;
          
            // Convert JavaScript timestamp to NSTimeInterval (seconds)
            NSTimeInterval startSeconds = [startDate doubleValue] / 1000.0;
            NSTimeInterval endSeconds = [endDate doubleValue] / 1000.0;

            // Create NSDate objects using NSTimeIntervals
            event.startDate = [NSDate dateWithTimeIntervalSince1970:startSeconds];
            event.endDate = [NSDate dateWithTimeIntervalSince1970:endSeconds];

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
