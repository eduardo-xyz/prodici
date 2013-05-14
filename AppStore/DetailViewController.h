//
//  DetailViewController.h
//  AppStore
//
//  Created by Eduardo Oviedo Blanco on 5/13/13.
//
//

#import <UIKit/UIKit.h>

@interface DetailViewController : UIViewController <UISplitViewControllerDelegate>

@property (strong, nonatomic) id detailItem;

@property (weak, nonatomic) IBOutlet UILabel *detailDescriptionLabel;
@end
