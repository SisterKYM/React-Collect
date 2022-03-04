const mapUpdateUserSlug = (state, action) => ({
  ...state,
  user: {
    ...state.user,
    slug: action.payload.slug,
  },
});

export default mapUpdateUserSlug;
