# Gallery Page Redesign Tasks

## TASK-UI-001: Redesign Gallery Page with Instagram-style Masonry Grid Layout

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-21
**Updated:** 2025-01-21
**Estimated Time:** 6 hours
**Dependencies:** TASK-FEAT-013
**Related Tasks:** TASK-PERF-001

### Description

Redesign the GalleryPage component to use an Instagram-style masonry grid layout with square photos, no gaps between images, and responsive column count that automatically adjusts based on screen width. This will create a modern, visually appealing gallery experience similar to Instagram's feed.

### Requirements / What to Do

#### Step 1: Create Masonry Grid Layout Component
- [ ] Create `components/GalleryPage/MasonryGrid.tsx` component
- [ ] Implement responsive column calculation based on viewport width
  - Mobile (< 640px): 2 columns
  - Tablet (640px - 1024px): 3 columns
  - Desktop (1024px - 1440px): 4 columns
  - Large Desktop (> 1440px): 5 columns
- [ ] Use CSS Grid or Flexbox for layout
- [ ] Ensure square aspect ratio (1:1) for all images
- [ ] Remove all gaps between photos (gap: 0)
- [ ] Implement proper image container sizing

#### Step 2: Update GalleryPage Component
- [ ] Modify `components/GalleryPage.tsx` to use new MasonryGrid component
- [ ] Remove existing grid layout (current 2-column layout with gaps)
- [ ] Remove image titles and category labels from grid (keep header filters)
- [ ] Update image rendering to use square containers
- [ ] Ensure images fill containers completely (object-cover)
- [ ] Maintain filter functionality for categories
- [ ] Keep header section with title and category filters

#### Step 3: Implement Responsive Column Logic
- [ ] Create utility hook `hooks/useResponsiveColumns.ts`
  - Use `useEffect` and `window.innerWidth` or `ResizeObserver`
  - Calculate columns based on breakpoints
  - Return column count
- [ ] Integrate hook into MasonryGrid component
- [ ] Test column changes on window resize
- [ ] Ensure smooth transitions when columns change

#### Step 4: Update Image Data Structure
- [ ] Ensure images have `uploadedAt` or `createdAt` timestamp field
- [ ] Sort images by newest first (descending order by date)
- [ ] Update TypeScript types if needed in `types.ts`
- [ ] Verify image URLs are accessible

### Definition of Done (DoD)

- [ ] MasonryGrid component created and functional
- [ ] Gallery page displays square photos in masonry layout
- [ ] No gaps visible between photos
- [ ] Column count adjusts automatically based on screen width
- [ ] Images maintain 1:1 aspect ratio (square)
- [ ] Responsive breakpoints work correctly on all screen sizes
- [ ] Filter functionality still works
- [ ] Code follows project TypeScript and React guidelines
- [ ] No console errors or warnings
- [ ] Component is properly typed with TypeScript interfaces
- [ ] Images are sorted by newest first

### Verification Steps

1. **Manual Testing:**
   - Open `/gallery` route in browser
   - Verify photos display in square format
   - Verify no gaps between photos
   - Resize browser window and verify columns adjust:
     - < 640px: Should show 2 columns
     - 640px-1024px: Should show 3 columns
     - 1024px-1440px: Should show 4 columns
     - > 1440px: Should show 5 columns
   - Test on mobile device (should show 2 columns)
   - Test on tablet (should show 3 columns)
   - Test on desktop (should show 4-5 columns)
   - Verify newest photos appear at top
   - Test category filters still work

2. **Automated Testing:**
   ```bash
   npm test components/GalleryPage.test.tsx
   npm test components/GalleryPage/MasonryGrid.test.tsx
   npm run test:coverage  # Should maintain >80% coverage
   ```

3. **Code Quality:**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

4. **Visual Testing:**
   - Compare layout to Instagram feed (reference)
   - Verify images are perfectly square
   - Check that no white spaces appear between images
   - Ensure layout looks balanced and professional

### Acceptance Criteria

- ✅ Gallery displays photos in Instagram-style masonry grid
- ✅ All photos are square (1:1 aspect ratio)
- ✅ No gaps visible between photos
- ✅ Column count automatically adjusts based on screen width
- ✅ Layout is responsive and works on all device sizes
- ✅ Newest photos appear at the top of the grid
- ✅ Category filters continue to work correctly
- ✅ Page loads without layout shift
- ✅ Images maintain quality and don't appear stretched

### Technical Details

**Files to Create:**
- `components/GalleryPage/MasonryGrid.tsx`
- `components/GalleryPage/hooks/useResponsiveColumns.ts`
- `components/GalleryPage/__tests__/MasonryGrid.test.tsx`

**Files to Modify:**
- `components/GalleryPage.tsx`
- `types.ts` (if image type needs timestamp field)
- `constants.tsx` (if GALLERY_IMAGES structure needs updating)

**Dependencies:**
- React hooks (useState, useEffect, useMemo)
- Window resize events or ResizeObserver API
- CSS Grid or Flexbox for layout

**Design Specifications:**
- Square images: `aspect-ratio: 1 / 1`
- No gaps: `gap: 0` or `gap-0` in Tailwind
- Responsive columns: Use CSS Grid with `grid-template-columns: repeat(auto-fill, minmax(...))` or calculate columns dynamically
- Image sizing: `object-cover` to fill square containers

**Notes:**
- Consider using CSS Grid's `grid-auto-rows` for consistent square sizing
- May need to calculate optimal image size based on viewport and column count
- Ensure images load efficiently (see TASK-PERF-001)

---

## TASK-PERF-001: Implement Image Lazy Loading and Pre-loading for Gallery

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-21
**Updated:** 2025-01-21
**Estimated Time:** 4 hours
**Dependencies:** TASK-UI-001
**Related Tasks:** TASK-FEAT-013

### Description

Implement smooth scrolling with lazy loading and pre-loading of gallery images to optimize performance when displaying ~500 photos. Images should load as they enter the viewport (lazy loading) and pre-load images that are about to come into view (pre-loading) to ensure smooth scrolling experience.

### Requirements / What to Do

#### Step 1: Implement Lazy Loading
- [ ] Create `components/GalleryPage/LazyImage.tsx` component
- [ ] Use Intersection Observer API to detect when image enters viewport
- [ ] Load image only when it's about to enter viewport (with threshold)
- [ ] Show placeholder or skeleton while loading
- [ ] Handle loading errors gracefully
- [ ] Use native `loading="lazy"` attribute as fallback

#### Step 2: Implement Pre-loading Strategy
- [ ] Create `hooks/useImagePreloader.ts` hook
- [ ] Pre-load images that are 1-2 viewport heights below current scroll position
- [ ] Use `Image` object to pre-load images in background
- [ ] Track which images have been pre-loaded to avoid duplicates
- [ ] Limit concurrent pre-loads to avoid overwhelming browser
- [ ] Cancel pre-loads if user scrolls away quickly

#### Step 3: Optimize Image Loading
- [ ] Implement progressive image loading (low quality placeholder → full quality)
- [ ] Use appropriate image sizes based on viewport and column count
- [ ] Consider using `srcset` for responsive images if needed
- [ ] Add loading states and transitions
- [ ] Implement image caching strategy

#### Step 4: Smooth Scrolling Optimization
- [ ] Ensure scroll performance is smooth (60fps)
- [ ] Use `will-change` CSS property for images during scroll
- [ ] Debounce scroll events if needed
- [ ] Optimize re-renders during scroll
- [ ] Test scroll performance with 500+ images

#### Step 5: Integrate with GalleryPage
- [ ] Replace standard `<img>` tags with `LazyImage` component
- [ ] Integrate pre-loader hook into GalleryPage
- [ ] Ensure pre-loading works with filtered views
- [ ] Test with all 500 photos

### Definition of Done (DoD)

- [ ] LazyImage component created and working
- [ ] Images load only when entering viewport
- [ ] Pre-loading loads images 1-2 viewport heights ahead
- [ ] Smooth scrolling maintained with 500+ images
- [ ] No performance degradation when scrolling
- [ ] Loading states/placeholders shown appropriately
- [ ] Error handling for failed image loads
- [ ] Code follows project guidelines
- [ ] No memory leaks (cleanup in useEffect)
- [ ] Tests written for lazy loading and pre-loading

### Verification Steps

1. **Performance Testing:**
   - Open gallery with 500 photos
   - Open browser DevTools Network tab
   - Scroll through gallery slowly
   - Verify images load as they enter viewport
   - Verify images pre-load ahead of scroll position
   - Check that not all 500 images load at once
   - Monitor memory usage (should remain stable)
   - Check scroll FPS (should maintain 60fps)

2. **Manual Testing:**
   - Scroll quickly through gallery
   - Verify smooth scrolling without stuttering
   - Verify images appear as you scroll
   - Test on slow network connection (throttle in DevTools)
   - Verify placeholder/skeleton shows while loading
   - Test error handling (break image URL, verify graceful failure)
   - Test on mobile device (touch scrolling)

3. **Automated Testing:**
   ```bash
   npm test components/GalleryPage/LazyImage.test.tsx
   npm test components/GalleryPage/hooks/useImagePreloader.test.tsx
   npm run test:coverage
   ```

4. **Performance Metrics:**
   - Lighthouse performance score should be > 90
   - Time to Interactive should be < 3 seconds
   - Cumulative Layout Shift (CLS) should be < 0.1
   - First Contentful Paint should be < 1.5 seconds

### Acceptance Criteria

- ✅ Images load lazily as user scrolls
- ✅ Images pre-load ahead of scroll position for smooth experience
- ✅ Scrolling remains smooth with 500+ images
- ✅ Initial page load is fast (< 3 seconds)
- ✅ No performance degradation during scrolling
- ✅ Loading states provide good user feedback
- ✅ Error handling works for broken image URLs
- ✅ Memory usage remains stable during long scrolling sessions

### Technical Details

**Files to Create:**
- `components/GalleryPage/LazyImage.tsx`
- `components/GalleryPage/hooks/useImagePreloader.ts`
- `components/GalleryPage/__tests__/LazyImage.test.tsx`
- `components/GalleryPage/__tests__/hooks/useImagePreloader.test.tsx`

**Files to Modify:**
- `components/GalleryPage/MasonryGrid.tsx` (use LazyImage)
- `components/GalleryPage.tsx` (integrate pre-loader)

**Dependencies:**
- Intersection Observer API
- React hooks (useState, useEffect, useRef, useCallback)
- Image pre-loading with native Image API

**Performance Considerations:**
- Pre-load buffer: 1-2 viewport heights
- Max concurrent pre-loads: 5-10 images
- Intersection Observer threshold: 0.1 (load when 10% visible)
- Use `requestIdleCallback` for non-critical pre-loads if available

**Notes:**
- Consider using `react-intersection-observer` library if needed
- May need to adjust pre-load buffer based on scroll speed
- Consider virtual scrolling for very large datasets (future enhancement)

---

## TASK-FEAT-013: Generate and Organize Gallery Photo Dataset (~500 Photos)

**Status:** COMPLETED
**Priority:** MEDIUM
**Assignee:** unassigned
**Created:** 2025-01-21
**Updated:** 2025-01-21
**Estimated Time:** 3 hours
**Dependencies:** none
**Related Tasks:** TASK-UI-001, TASK-PERF-001

### Description

Generate or curate approximately 500 high-quality photos for the gallery page. Organize photos with proper metadata (category, title, upload date) and ensure they are sorted by newest first. Photos should be relevant to nail salon services (manicures, pedicures, nail art, etc.).

### Requirements / What to Do

#### Step 1: Determine Photo Source Strategy
- [ ] Decide on photo source:
  - Option A: Use Unsplash API to generate 500 curated photos
  - Option B: Use placeholder service with nail salon keywords
  - Option C: Use existing photo library if available
  - Option D: Generate programmatically with seed values
- [ ] Document chosen approach
- [ ] Ensure photos are appropriate for nail salon context

#### Step 2: Create Photo Generation Utility
- [ ] Create `utils/generateGalleryPhotos.ts` utility function
- [ ] Generate 500 photo objects with:
  - Unique ID
  - Image URL (from chosen source)
  - Category (Manicure, Pedicure, Nail Art, etc.)
  - Title (descriptive name)
  - Uploaded date (newest first, spread over time)
  - Alt text for accessibility
- [ ] Ensure variety in categories
- [ ] Add timestamps in descending order (newest first)

#### Step 3: Update Data Structure
- [ ] Update `GalleryImage` type in `types.ts`:
  ```typescript
  interface GalleryImage {
    id: string;
    url: string;
    category: string;
    title: string;
    uploadedAt: string; // ISO date string
    alt: string;
  }
  ```
- [ ] Update `GALLERY_IMAGES` constant in `constants.tsx`
- [ ] Ensure backward compatibility with existing code
- [ ] Sort images by `uploadedAt` descending

#### Step 4: Organize Photo Categories
- [ ] Distribute 500 photos across categories:
  - Manicure: ~150 photos
  - Pedicure: ~100 photos
  - Nail Art: ~150 photos
  - Others: ~100 photos (Waxing, Eyelash, Facial, etc.)
- [ ] Ensure good variety within each category
- [ ] Create meaningful titles for each photo

#### Step 5: Generate Timestamps
- [ ] Create timestamps spread over last 6-12 months
- [ ] Ensure newest photos have most recent dates
- [ ] Add some variation (not all same date)
- [ ] Sort by date descending (newest first)

#### Step 6: Update Constants File
- [ ] Replace current `GALLERY_IMAGES` array with generated 500 photos
- [ ] Ensure all photos have required fields
- [ ] Verify URLs are accessible
- [ ] Test that all images load correctly

### Definition of Done (DoD)

- [ ] 500 photos generated and organized
- [ ] All photos have required metadata (id, url, category, title, uploadedAt, alt)
- [ ] Photos are sorted by newest first (uploadedAt descending)
- [ ] Photos are distributed across categories appropriately
- [ ] TypeScript types updated to include uploadedAt field
- [ ] Constants file updated with new photo dataset
- [ ] All image URLs are accessible
- [ ] No duplicate photo IDs
- [ ] Alt text provided for accessibility

### Verification Steps

1. **Data Verification:**
   ```bash
   # Check photo count
   # Verify all required fields exist
   # Check sorting order
   ```
   - Open `constants.tsx`
   - Verify `GALLERY_IMAGES.length === 500`
   - Verify all photos have `uploadedAt` field
   - Verify photos are sorted by date (newest first)
   - Check category distribution

2. **Image Accessibility:**
   - Test that all image URLs are accessible
   - Verify images load correctly
   - Check that alt text is meaningful
   - Test with screen reader (accessibility)

3. **Integration Testing:**
   - Load gallery page
   - Verify all 500 photos display
   - Verify newest photos appear at top
   - Test category filters work with new dataset
   - Check that page doesn't crash with large dataset

4. **Code Quality:**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

### Acceptance Criteria

- ✅ Gallery contains approximately 500 photos
- ✅ All photos have complete metadata
- ✅ Photos are sorted by newest first
- ✅ Photos are distributed across categories
- ✅ All image URLs are accessible and load correctly
- ✅ TypeScript types are updated and correct
- ✅ No duplicate IDs or missing fields
- ✅ Gallery page displays all photos correctly

### Technical Details

**Files to Create:**
- `utils/generateGalleryPhotos.ts` (optional, if generating programmatically)

**Files to Modify:**
- `types.ts` (add `uploadedAt` to GalleryImage interface)
- `constants.tsx` (update GALLERY_IMAGES array)

**Photo Source Options:**

**Option A: Unsplash API (Recommended)**
- Use Unsplash API with search terms: "nail art", "manicure", "pedicure"
- Generate unique URLs with different seeds
- Pros: High quality, real photos
- Cons: Requires API key, rate limits

**Option B: Placeholder Service**
- Use services like `picsum.photos` or `placeholder.com`
- Generate with seed values for variety
- Pros: No API needed, fast
- Cons: May not be nail salon specific

**Option C: Programmatic Generation**
- Use seed-based generation for consistent URLs
- Create utility function to generate photo objects
- Pros: Full control, no external dependencies
- Cons: Photos may not be contextually relevant

**Data Structure:**
```typescript
export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title: string;
  uploadedAt: string; // ISO 8601 date string
  alt: string;
}
```

**Category Distribution:**
- Manicure: 30% (~150 photos)
- Nail Art: 30% (~150 photos)
- Pedicure: 20% (~100 photos)
- Others: 20% (~100 photos)

**Timestamp Strategy:**
- Spread dates over last 12 months
- Newest: Last 1-2 months (more photos)
- Older: Earlier months (fewer photos)
- Use realistic distribution (more recent = more photos)

**Notes:**
- Consider using environment variable for photo source API key
- May want to cache generated photo list
- Consider adding photo metadata (dimensions, file size) for future optimizations

---

**Completion Date:** 2025-01-21
**Completed By:** AI Assistant
**Notes:**
- Successfully generated 500 gallery photos using Unsplash Source API
- Photos distributed across categories: Manicure (150), Nail Art (150), Pedicure (100), Waxing (30), Eyelash (30), Facial (40)
- All photos have required metadata: id, url, category, title, uploadedAt, alt
- Photos sorted by newest first (uploadedAt descending)
- Updated GalleryImage type in types.ts to include uploadedAt and alt fields
- Updated GalleryPage component to use alt field for accessibility
- All tests passing (10/10)
- Verified: 500 photos generated, all required fields present, sorted correctly

