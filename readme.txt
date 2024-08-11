=== AnimateWP ===
Contributors: millertchris
Donate link: https://animatewp.com
Tags: animations, block-editor, gsap, scroll trigger,
Requires at least: 6.0
Tested up to: 6.6.1
Stable tag: 1.1.1
Requires PHP: 8.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

AnimateWP empowers WordPress users to easily add captivating animations to any block or section, transforming your site with dynamic visual flair.

== Description ==

AnimateWP transforms static content into dynamic, engaging experiences that captivate and retain visitors. Whether you're looking to enhance user interaction, emphasize important content, or simply add visual flair, AnimateWP provides the tools you need to create stunning animations with ease.

**Features:**

* Compatibility: Works seamlessly with core blocks, third-party blocks, and custom blocks.
* Advanced Controls: Full access to detailed animation settings for precise customization.
* Presets: Select from a variety of presets to quickly apply animations.
* Customizable: Tailor presets or create custom animations to fit your unique needs.
* Triggers: Control exactly when animations occur, including scroll triggers.

[View AnimateWP Support Documentation](https://prolificdigital.notion.site/AnimateWP-Documentation-138f73948280458d9a2bcd298ac62354)

**Usage**

Once the AnimateWP plugin is activated, you'll find new animation options available for every block within the block editor.

**Adding an Animation**

1. Select the block you wish to animate.
2. In the block toolbar, click on the animations icon.
3. Choose a preset animation type from the dropdown menu. You can select from options such as Fade In, Fade Up, Fade Down, Fade Left, Fade Right, Bounce, Zoom In, Zoom Out, Rotate, Flip, Shake, Pulse, and Wobble.

**Preset Options**

To quickly get started with animations, choose a preset from the available list in the block toolbar. Presets will auto-configure the advanced settings, allowing you to see how the animation options change. You can further refine these settings to meet your needs.

1. **Fade In**
2. **Fade Up**
3. **Fade Down**
4. **Fade Left**
5. **Fade Right**
6. **Bounce**
7. **Zoom In**
8. **Zoom Out**
9. **Rotate**
10. **Flip**
11. **Shake**
12. **Pulse**
13. **Wobble**

![Animation Settings](./assets/screenshots/example.png)

**Advanced Animation Settings**

Customize your animations with the following options:

1. **Enable Animation**: Toggle this option to enable the animation.
2. **Loop**: Enable this option to loop the animation.
3. **Auto Play**: Enable this option to auto-play the animation.
4. **Animation Duration**: Set the duration of the animation in seconds.
5. **Animation Delay**: Set the delay before the animation starts in seconds.
6. **Animation Easing**: Choose the easing function for the animation.
7. **X Position (PX)**: Set the X position for the animation in pixels.
8. **Y Position (PX)**: Set the Y position for the animation in pixels.
9. **X Percent (%)**: Set the X position as a percentage for the animation.
10. **Y Percent (%)**: Set the Y position as a percentage for the animation.
11. **Scale**: Set the scale for the animation.
12. **Rotation (Degrees)**: Set the rotation for the animation in degrees.
13. **Opacity**: Set the opacity for the animation.
14. **Repeat**: Set the number of times the animation should repeat.
15. **Yo-Yo**: Enable this option to make the animation reverse on repeat.
16. **Enable Scroll Trigger**: Enable this option to trigger the animation on scroll.
17. **Scroll Trigger Start**: Select the start point for the scroll trigger.
18. **Scroll Trigger Start Offset (PX)**: Set an offset for the scroll trigger start point in pixels.

**Understanding Animation "From"**

The animations in AnimateWP work by animating the block "from" a specified state to its final state. This means that you define where the animation starts, and the block transitions from that state to its natural position and appearance.

**Example: Fade In from Left**

To create a "Fade In from Left" animation:

1. **Enable Animation**: Toggle this option to enable the animation.
2. **Animation Type**: Select "Fade In".
3. **X Position (PX)**: Set the X position to -100 (or any negative value) to start the block to the left.
4. **Animation Duration**: Set the duration to 1 second (or any preferred duration).
5. **Animation Easing**: Choose an easing function, such as "Power1.inOut".

This setup will make the block start 100 pixels to the left of its natural position and fade in while moving to its final position over the course of 1 second.

AnimateWP is a powerful tool that brings your WordPress site to life with engaging and customizable animations. Whether you're looking to enhance user interaction or add visual flair to your content, AnimateWP provides the flexibility and control you need.

Happy animating!

== Frequently Asked Questions ==

= How do I add an animation to a block? =

Once the AnimateWP plugin is activated, select the block you wish to animate. In the block toolbar, click on the animations icon and choose a preset animation type from the dropdown menu.

= Can I customize the animation settings? =

Yes, AnimateWP offers advanced settings for detailed customization, including options for duration, delay, easing, and more.

= Can I trigger animations based on user scroll? =

Yes, AnimateWP allows you to enable scroll triggers for animations. You can customize when the animation starts, including setting a scroll trigger start offset for precise control.

= Is AnimateWP compatible with third-party blocks? =

Absolutely! AnimateWP is designed to work seamlessly with core WordPress blocks, third-party blocks, and custom blocks, ensuring you can add animations across your site.

= Can I create custom animations with AnimateWP? =

Yes, you can fully customize animations by adjusting the advanced settings, such as duration, delay, position, scale, rotation, and more. You can also save and reuse custom presets.

= What happens if I disable the plugin? =

If you disable AnimateWP, any animations applied using the plugin will no longer be active. Your content will revert to its static state without the animations.

= Does AnimateWP affect my site's performance? =

AnimateWP is optimized for performance. However, like any plugin that adds animations, it’s recommended to test your site after applying animations to ensure it meets your performance standards.


== Screenshots ==

1. Showcasing animation abilities

== Changelog ==

= 1.1.1 =
* Updated readme

= 1.1.0 =
* Added support for decimals in the delay settings for more granular control.
* Increased duration and delay max values to 60 seconds.

= 1.0.0 =
* Initial release of AnimateWP with core features including presets and advanced settings.

== Upgrade Notice ==

= 1.1.0 =
This update adds more granular control over delay settings and extends maximum duration and delay values. Recommended for all users.

= 1.0.0 =
Initial release. No previous versions to upgrade from.

== Support ==

For further assistance, contact [support@prolificdigital.com](mailto:support@prolificdigital.com).

For more detailed information, visit our [documentation page](https://prolificdigital.notion.site/AnimateWP-Documentation-138f73948280458d9a2bcd298ac62354).